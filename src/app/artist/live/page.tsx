// LIVE QUEUE - Real-time request management for artists
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRealtime } from '@/hooks/useRealtime';
import type { Artist, Event, Request, TablesUpdate } from '@/lib/supabase/types';
import { EVENT_STATUS } from '@/types/event-status';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Header } from '@/components/layout/Header';

// Helper Component for Request Card
function RequestCard({
    request,
    onAccept,
    onReject,
    highlight = false,
    isPaid = false,
    hideActions = false
}: {
    request: Request;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
    highlight?: boolean;
    isPaid?: boolean;
    hideActions?: boolean;
}) {
    return (
        <Card className={`bg-white/10 border-white/20 transition-all ${highlight ? 'border-yellow-500/50 shadow-[0_0_15px_-5px_rgba(234,179,8,0.3)]' : ''} ${isPaid ? 'border-green-500/50 bg-green-900/10' : ''}`}>
            <div className="flex justify-between items-start mb-3 gap-2">
                <div className="min-w-0">
                    <p className={`font-semibold text-lg truncate ${highlight ? 'text-yellow-500' : ''} ${isPaid ? 'text-green-400' : ''}`}>
                        {request.guest_name}
                    </p>
                    <p className="text-white/80 break-words text-sm">{request.content}</p>
                </div>
                <Badge variant={request.payment_status === 'PAID' ? 'success' : 'default'} className="shrink-0">
                    {request.amount > 0 ? `R$ ${request.amount.toFixed(2)}` : 'Grátis'}
                </Badge>
            </div>

            {!hideActions && (
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => onAccept(request.id)}
                    >
                        ✓ Aceitar
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 bg-white/5 hover:bg-red-500/20 hover:text-red-500"
                        onClick={() => onReject(request.id)}
                    >
                        ✕
                    </Button>
                </div>
            )}
        </Card>
    );
}

export default function LiveQueuePage() {
    const router = useRouter();
    const { user, loading: authLoading, supabase } = useAuth();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'PAID' | 'FREE' | 'WAITING'>('ALL');
    const [showEndModal, setShowEndModal] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push('/login?type=artist');
            return;
        }
        loadData();
    }, [user, authLoading, router]);

    async function loadData() {
        if (!user) return;

        try {
            const { data: artistData } = await supabase
                .from('artists')
                .select('*')
                .eq('owner_id', user.id)
                .single();

            if (!artistData) {
                router.push('/me');
                return;
            }

            const currentArtist = artistData as Artist;
            setArtist(currentArtist);

            const { data: eventData } = await supabase
                .from('events')
                .select('*')
                .eq('artist_id', currentArtist.id)
                .eq('status', 'LIVE')
                .single();

            if (!eventData) {
                alert('Nenhum evento ao vivo');
                router.push('/artist/dashboard');
                return;
            }

            const currentEvent = eventData as Event;
            setEvent(currentEvent);

            const { data: requestsData } = await supabase
                .from('requests')
                .select('*')
                .eq('event_id', currentEvent.id)
                .order('created_at', { ascending: false });

            setRequests(requestsData || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    }

    useRealtime({
        eventId: event?.id || '',
        onInsert: (newRequest) => {
            console.log('LivePage received new request:', newRequest);
            setRequests((prev) => [newRequest, ...prev]);
        },
        onUpdate: (updatedRequest) => {
            setRequests((prev) =>
                prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r))
            );
        },
    });

    useEffect(() => {
        if (!event) return;

        const channel = supabase.channel(`event-${event.id}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'events',
                filter: `id=eq.${event.id}`
            }, (payload) => {
                const updatedEvent = payload.new as Event;
                setEvent(updatedEvent);
                if (updatedEvent.status === EVENT_STATUS.FINISHED) {
                    // Evento encerrado via outro dispositivo
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [event?.id, supabase]);

    async function handleAccept(requestId: string) {
        try {
            const updateData: TablesUpdate<'requests'> = { status: 'PLAYED' };
            const { error } = await (supabase
                .from('requests') as any)
                .update(updateData)
                .eq('id', requestId);

            if (error) throw error;
            await loadData();
        } catch (error: any) {
            console.error('Error accepting request:', error);
            alert(`Erro ao aceitar pedido: ${error.message || 'Erro desconhecido'}`);
        }
    }

    async function handleReject(requestId: string) {
        try {
            const updateData: TablesUpdate<'requests'> = { status: 'ARCHIVED' };
            const { error } = await (supabase
                .from('requests') as any)
                .update(updateData)
                .eq('id', requestId);

            if (error) throw error;
            await loadData();
        } catch (error: any) {
            console.error('Error rejecting request:', error);
            alert(`Erro ao rejeitar pedido: ${error.message || 'Erro desconhecido'}`);
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
            setEvent({ ...event, status: EVENT_STATUS.FINISHED });
        } catch (error: any) {
            console.error('Error ending event:', error);
            alert(`Erro ao encerrar evento: ${error.message || 'Erro desconhecido'}`);
        }
    }

    const filteredRequests = filter === 'ALL'
        ? requests.filter((r) => r.status === 'PENDING')
        : requests.filter((r) => r.payment_status === filter && r.status === 'PENDING');

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-light">Carregando...</div>
            </div>
        );
    }

    if (event?.status === EVENT_STATUS.FINISHED) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Container>
                    <Card className="bg-white/10 border-white/20 text-center max-w-md mx-auto">
                        <div className="py-8">
                            <h1 className="text-4xl font-display font-bold mb-4">
                                Seu show foi encerrado!
                            </h1>
                            <p className="text-white/70 mb-8 text-lg">
                                O evento ao vivo foi finalizado. Obrigado por usar o Toca Aí!
                            </p>
                            <a
                                href="/artist/dashboard"
                                className="inline-block w-full px-8 py-4 text-lg bg-accent hover:bg-accent-hover text-white rounded-full font-semibold transition-all"
                                style={{ textDecoration: 'none' }}
                            >
                                Voltar ao Dashboard
                            </a>
                        </div>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <>
            <Header />

            <div className="min-h-screen bg-black text-white pt-32 pb-6">
                <Container>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold mb-2">{artist?.name}</h1>
                            <Badge variant="live">● AO VIVO</Badge>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEndModal(true)}
                                className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                            >
                                Encerrar ao vivo
                            </button>
                            <a
                                href="/artist/dashboard"
                                className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all inline-block"
                                style={{ textDecoration: 'none' }}
                            >
                                ← Voltar
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1: Todos (Aprovados/History) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                <h3 className="font-bold text-lg">Todos</h3>
                                <Badge variant="default" className="bg-white/10">{requests.filter((r) => r.status === 'PLAYED').length}</Badge>
                            </div>
                            <div className="space-y-3">
                                {requests.filter((r) => r.status === 'PLAYED').map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        request={request}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                        hideActions={true}
                                    />
                                ))}
                                {requests.filter((r) => r.status === 'PLAYED').length === 0 && (
                                    <p className="text-white/40 text-sm text-center py-4">Nenhum pedido aprovado</p>
                                )}
                            </div>
                        </div>

                        {/* Column 2: Aguardando (Todos Pendentes - Master List) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                <h3 className="font-bold text-lg text-yellow-500">Aguardando</h3>
                                <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">{requests.filter((r) => r.status === 'PENDING').length}</Badge>
                            </div>
                            <div className="space-y-3">
                                {requests.filter((r) => r.status === 'PENDING').map((request) => (
                                    <RequestCard key={request.id} request={request} onAccept={handleAccept} onReject={handleReject} highlight={true} />
                                ))}
                                {requests.filter((r) => r.status === 'PENDING').length === 0 && (
                                    <p className="text-white/40 text-sm text-center py-4">Fila vazia</p>
                                )}
                            </div>
                        </div>

                        {/* Column 3: Pagos (Paid High Priority) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                <h3 className="font-bold text-lg text-green-500">Pagos</h3>
                                <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">{requests.filter((r) => r.payment_status === 'PAID' && r.status === 'PENDING' && r.amount > 1).length}</Badge>
                            </div>
                            <div className="space-y-3">
                                {requests.filter((r) => r.payment_status === 'PAID' && r.status === 'PENDING' && r.amount > 1).map((request) => (
                                    <RequestCard key={request.id} request={request} onAccept={handleAccept} onReject={handleReject} isPaid={true} />
                                ))}
                                {requests.filter((r) => r.payment_status === 'PAID' && r.status === 'PENDING' && r.amount > 1).length === 0 && (
                                    <p className="text-white/40 text-sm text-center py-4">Nenhum pedido pago</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
                <ConfirmationModal
                    isOpen={showEndModal}
                    onClose={() => setShowEndModal(false)}
                    onConfirm={handleEndLive}
                    title="Encerrar evento"
                    message="Tem certeza que quer encerrar o evento? Isso irá parar o recebimento de novos pedidos."
                    confirmText="Encerrar Evento"
                    variant="danger"
                />
            </div>
        </>
    );
}
