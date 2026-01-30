// ARTIST PAGE - Dynamic route with tabs for requests and support
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { DonationPicker } from '@/components/DonationPicker';
import { PixModal } from '@/components/PixModal';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import type { Artist, Event, CreateMessageOutput, DonationMode } from '@/lib/supabase/types';
import { Instagram, Phone, Music2 } from 'lucide-react';

function normalizeUrl(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
}

function buildInstagramUrl(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    const handle = trimmed.startsWith('@') ? trimmed.slice(1) : trimmed;
    return `https://instagram.com/${handle}`;
}

function buildWhatsAppUrl(value: string): string {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
    return `https://wa.me/${withCountry}`;
}

export default function ArtistPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const supabase = createClient();

    const [artist, setArtist] = useState<Artist | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'request' | 'support'>('request');

    // Form state
    const [guestName, setGuestName] = useState('');
    const [content, setContent] = useState('');
    const [amount, setAmount] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Pix modal state
    const [pixModalOpen, setPixModalOpen] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);

    useEffect(() => {
        loadData();

        // Load guest name from localStorage
        const savedName = localStorage.getItem('guestName');
        if (savedName) {
            setGuestName(savedName);
        }
    }, [slug]);

    async function loadData() {
        try {
            // Fetch artist
            const { data: artistData, error: artistError } = await supabase
                .from('artists')
                .select('*')
                .eq('slug', slug)
                .single();

            if (artistError || !artistData) {
                setArtist(null);
                setLoading(false);
                return;
            }

            const currentArtist = artistData as Artist;
            setArtist(currentArtist);

            // Fetch LIVE event
            const { data: eventData } = await supabase
                .from('events')
                .select('*')
                .eq('artist_id', currentArtist.id)
                .eq('status', 'LIVE')
                .single();

            setEvent(eventData as Event | null);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    }

    async function handleSubmit() {
        if (!event || !content.trim() || !guestName.trim()) return;

        // Validate minimum value if MANDATORY
        const minValue = event.min_donation_value ?? 0;
        if (event.donation_mode === 'MANDATORY' && amount < minValue) {
            alert(`Valor mínimo é R$ ${minValue.toFixed(2)}`);
            return;
        }

        setSubmitting(true);

        try {
            // Save guest name to localStorage
            localStorage.setItem('guestName', guestName);

            // Call edge function
            const { data, error } = await supabase.functions.invoke<CreateMessageOutput>('criar-mensagem-musico', {
                body: {
                    event_id: event.id,
                    content,
                    amount,
                    guest_name: guestName,
                },
            });

            if (error || !data) {
                throw new Error('Failed to create request');
            }

            setRequestId(data.request_id);

            // If amount is 0, navigate to success directly
            if (amount === 0) {
                // Force navigation to ensure it works
                window.location.href = `/${slug}/sucesso?request_id=${data.request_id}`;
            } else {
                // Open Pix modal - map edge function field names
                setQrCode(data.pix_copy_paste ?? data.qr_code ?? null);
                setQrCodeBase64(data.pix_base64 ?? data.qr_code_base64 ?? null);
                setPixModalOpen(true);
            }
        } catch (error) {
            console.error('Error submitting:', error);
            alert('Erro ao enviar pedido. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
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

                        <Button onClick={() => router.push('/buscar')}>Buscar outro</Button>
                    </div>
                </Container>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold mb-2">{artist.name}</h1>
                        <p className="text-primary-light mb-6">
                            Evento não está ao vivo no momento.
                        </p>
                        <Button onClick={() => router.push('/')}>Voltar para home</Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Local Header - Plain HTML to avoid click-blocking issues */}
            <header className="fixed top-0 left-0 right-0 z-[200] bg-black/50 backdrop-blur-md border-b border-white/5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img
                            src="/logotocai.svg"
                            alt="Toca Aí"
                            className="h-8 w-auto"
                        />
                    </a>
                    <nav className="flex items-center gap-4">
                        <a href="/buscar" className="text-sm font-medium text-white hover:text-accent transition-colors" style={{ textDecoration: 'none' }}>
                            Encontre a banda
                        </a>
                    </nav>
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-[calc(env(safe-area-inset-top)+64px)]" />

            <Section>
                <Container>
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-display font-bold mb-2">{artist.name}</h1>
                            <p className="text-primary-light mb-3">@{artist.slug}</p>
                            <Badge variant="live">● AO VIVO</Badge>
                        </div>

                        {(artist.avatar_url || artist.whatsapp_contact || artist.instagram_link || artist.pix_key) && (
                            <div className="flex flex-col items-center gap-4 mb-8">
                                {artist.avatar_url && (
                                    <img
                                        src={artist.avatar_url}
                                        alt={artist.name}
                                        className="w-24 h-24 rounded-full object-cover border border-white/10"
                                    />
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-sm">
                                    {artist.whatsapp_contact && (
                                        <a
                                            href={buildWhatsAppUrl(artist.whatsapp_contact)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-pill bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm">WhatsApp</span>
                                        </a>
                                    )}

                                    {artist.instagram_link && (
                                        <a
                                            href={buildInstagramUrl(artist.instagram_link)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-pill bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            <Instagram className="w-4 h-4" />
                                            <span className="text-sm">Instagram</span>
                                        </a>
                                    )}

                                    {artist.pix_key && (
                                        <a
                                            href={normalizeUrl(artist.pix_key)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-pill bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            <Music2 className="w-4 h-4" />
                                            <span className="text-sm">Spotify</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="grid grid-cols-2 gap-2 mb-6 border-b border-border">
                            <button
                                onClick={() => setActiveTab('request')}
                                className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium transition-all ${activeTab === 'request'
                                    ? 'border-b-2 border-accent text-accent'
                                    : 'text-primary-light hover:text-primary'
                                    }`}
                            >
                                Pedir música / recado
                            </button>
                            <button
                                onClick={() => setActiveTab('support')}
                                className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium transition-all ${activeTab === 'support'
                                    ? 'border-b-2 border-accent text-accent'
                                    : 'text-primary-light hover:text-primary'
                                    }`}
                            >
                                Apoiar artista
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Seu nome</label>
                                <Input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Como quer aparecer?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {activeTab === 'request' ? 'Seu pedido' : 'Mensagem (opcional)'}
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={
                                        activeTab === 'request'
                                            ? 'Ex: Toca Evidências!'
                                            : 'Deixe uma mensagem de apoio'
                                    }
                                    className="w-full px-4 py-3 bg-white/5 text-white placeholder:text-white/50 border border-white/10 rounded-input focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                    rows={4}
                                    required={activeTab === 'request'}
                                />
                            </div>

                            <DonationPicker
                                mode={event.donation_mode as DonationMode ?? 'OPTIONAL'}
                                minValue={event.min_donation_value ?? 0}
                                value={amount}
                                onChange={setAmount}
                            />

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting || !guestName.trim() || (activeTab === 'request' && !content.trim())}
                                className="w-full px-8 py-4 text-lg rounded-full font-semibold bg-accent hover:bg-accent-hover text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 hover:shadow-accent/40"
                            >
                                {submitting ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />

            {/* Pix Modal */}
            {event && (
                <PixModal
                    isOpen={pixModalOpen}
                    onClose={() => setPixModalOpen(false)}
                    requestId={requestId}
                    eventId={event.id}
                    qrCode={qrCode}
                    qrCodeBase64={qrCodeBase64}
                    artistSlug={slug}
                />
            )}
        </div>
    );
}
