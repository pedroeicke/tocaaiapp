// ARTIST DASHBOARD - Event management and configuration
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

import { useAuth } from '@/hooks/useAuth';
import type { Artist, Event, DonationMode, TablesInsert, TablesUpdate } from '@/lib/supabase/types';
import { EVENT_STATUS } from '@/types/event-status';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export default function ArtistDashboard() {
    const router = useRouter();
    const { user, loading: authLoading, supabase } = useAuth();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [minValue, setMinValue] = useState(0);
    const [donationMode, setDonationMode] = useState<'OPTIONAL' | 'MANDATORY'>('OPTIONAL');
    const [showStartModal, setShowStartModal] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);

    useEffect(() => {
        // Wait for auth to finish loading before making decisions
        if (authLoading) return;

        // If no user after auth loaded, redirect to login
        if (!user) {
            router.push('/login?type=artist');
            return;
        }

        // User is authenticated, load data
        loadData();
    }, [user, authLoading, router]);

    async function loadData() {
        if (!user) return;

        try {
            // Load artist
            const { data: artistData } = await supabase
                .from('artists')
                .select('*')
                .eq('owner_id', user.id)
                .single();

            if (!artistData) {
                alert('Você não é dono de nenhum artista');
                router.push('/me');
                return;
            }

            const currentArtist = artistData as Artist;
            setArtist(currentArtist);

            // Load current event
            const { data: eventData } = await supabase
                .from('events')
                .select('*')
                .eq('artist_id', currentArtist.id)
                .eq('status', EVENT_STATUS.LIVE)
                .single();

            if (eventData) {
                const currentEvent = eventData as Event;
                setEvent(currentEvent);
                setMinValue(currentEvent.min_donation_value ?? 0);
                setDonationMode(currentEvent.donation_mode as DonationMode ?? 'OPTIONAL');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    }

    async function handleStartLive() {
        if (!artist) return;


        console.log('Starting live event for artist:', artist.id);

        try {
            const eventData: TablesInsert<'events'> = {
                artist_id: artist.id,
                status: EVENT_STATUS.LIVE,
                min_donation_value: minValue,
                donation_mode: donationMode,
            };

            const { data, error } = await (supabase
                .from('events') as any)
                .insert(eventData)
                .select()
                .single();

            if (error) throw error;

            console.log('Event started:', data);
            setEvent(data);
            alert('Evento iniciado com sucesso!');
        } catch (error: any) {
            console.error('Error starting event:', error);
            alert(`Erro ao iniciar evento: ${error.message || 'Erro desconhecido'}`);
        }
    }


    async function handleEndLive() {
        if (!event) return;


        try {
            const updateData: TablesUpdate<'events'> = { status: EVENT_STATUS.FINISHED };

            const { error } = await (supabase
                .from('events') as any)
                .update(updateData)
                .eq('id', event.id);

            if (error) throw error;

            setEvent(null);
            alert('Evento encerrado!');
        } catch (error: any) {
            console.error('Error ending event:', error);
            alert(`Erro ao encerrar evento: ${error.message || 'Erro desconhecido'}`);
        }
    }



    function copyLink() {
        if (!artist) return;
        const link = `${window.location.origin}/${artist.slug}`;
        navigator.clipboard.writeText(link);
        alert('Link copiado!');
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-light">Carregando...</div>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold mb-4">Artista não encontrado</h1>
                        <Button onClick={() => router.push('/me')}>Ir para perfil</Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-backdrop pt-32 pb-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-display font-bold">{artist.name}</h1>
                        <p className="text-primary-light">@{artist.slug}</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Status Card */}
                        <motion.div variants={staggerItem}>
                            <Card>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-display font-semibold">Status do Evento</h2>
                                    {event && <Badge variant="live">● AO VIVO</Badge>}
                                </div>

                                {event ? (
                                    <div className="space-y-4">
                                        <p className="text-primary-light">
                                            Evento ativo! Pedidos estão chegando em tempo real.
                                        </p>
                                        <div className="flex gap-4">
                                            <Link href="/artist/live" target="_blank" rel="noopener noreferrer">
                                                <Button variant="primary">
                                                    Ver fila ao vivo
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" onClick={() => setShowEndModal(true)}>
                                                Encerrar evento
                                            </Button>
                                        </div>
                                        <div className="pt-2 border-t border-white/10">
                                            <Button variant="ghost" onClick={copyLink} className="w-full">
                                                📋 Copiar link do evento
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-primary-light">
                                            Nenhum evento ativo. Inicie para receber pedidos.
                                        </p>
                                        <Button variant="primary" onClick={() => setShowStartModal(true)}>
                                            Iniciar ao vivo
                                        </Button>
                                        <div className="pt-2 border-t border-white/10">
                                            <Button variant="ghost" onClick={copyLink} className="w-full">
                                                📋 Copiar link do evento
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>

                        <ConfirmationModal
                            isOpen={showStartModal}
                            onClose={() => setShowStartModal(false)}
                            onConfirm={handleStartLive}
                            title="Iniciar evento"
                            message="Tem certeza que você quer iniciar o ao vivo? Seus fãs poderão fazer pedidos de músicas."
                            confirmText="Iniciar Agora"
                        />

                        <ConfirmationModal
                            isOpen={showEndModal}
                            onClose={() => setShowEndModal(false)}
                            onConfirm={handleEndLive}
                            title="Encerrar evento"
                            message="Tem certeza que quer encerrar o evento? Isso irá parar o recebimento de novos pedidos."
                            confirmText="Encerrar Evento"
                            variant="danger"
                        />

                    </motion.div>

                </div>
            </Container >
        </div >
    );
}
