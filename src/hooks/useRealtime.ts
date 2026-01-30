// useRealtime Hook - Real-time Subscription for Requests
'use client';

import { useEffect, useState, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import type { Request } from '@/lib/supabase/types';

interface UseRealtimeOptions {
    eventId: string;
    onInsert?: (request: Request) => void;
    onUpdate?: (request: Request) => void;
    onDelete?: (request: Request) => void;
}

export function useRealtime({ eventId, onInsert, onUpdate, onDelete }: UseRealtimeOptions) {
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const supabase = createClient();

    // Use refs to store the latest callback functions
    // This prevents re-subscribing whenever a new callback function is passed (e.g. on every render)
    const onInsertRef = useRef(onInsert);
    const onUpdateRef = useRef(onUpdate);
    const onDeleteRef = useRef(onDelete);

    useEffect(() => {
        onInsertRef.current = onInsert;
        onUpdateRef.current = onUpdate;
        onDeleteRef.current = onDelete;
    }, [onInsert, onUpdate, onDelete]);

    useEffect(() => {
        if (!eventId) return;

        // Create channel for this event
        console.log(`Subscribing to realtime requests for event: ${eventId}`);
        const realtimeChannel = supabase
            .channel(`requests:event_id=eq.${eventId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'requests',
                    filter: `event_id=eq.${eventId}`,
                },
                (payload) => {
                    if (onInsertRef.current) {
                        console.log('Realtime INSERT received:', payload.new);
                        onInsertRef.current(payload.new as Request);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'requests',
                    filter: `event_id=eq.${eventId}`,
                },
                (payload) => {
                    if (onUpdateRef.current) {
                        onUpdateRef.current(payload.new as Request);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'requests',
                    filter: `event_id=eq.${eventId}`,
                },
                (payload) => {
                    if (onDeleteRef.current) {
                        onDeleteRef.current(payload.old as Request);
                    }
                }
            )
            .subscribe((status) => {
                console.log(`Realtime subscription status for event ${eventId}:`, status);
            });

        setChannel(realtimeChannel);

        // Cleanup
        return () => {
            console.log(`Unsubscribing from realtime requests for event: ${eventId}`);
            realtimeChannel.unsubscribe();
        };
    }, [eventId, supabase]); // Removed callbacks from dependencies

    return { channel };
}
