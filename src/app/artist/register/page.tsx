// ARTIST REGISTRATION - Create artist profile for logged-in users
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import type { TablesInsert } from '@/lib/supabase/types';
import { uploadAvatar } from '@/lib/signup/uploadAvatar';
import { motion } from 'framer-motion';
import { sectionEnter } from '@/lib/animations';

export default function ArtistRegistrationPage() {
    const router = useRouter();
    const { user, loading: authLoading, supabase } = useAuth();
    const [bandName, setBandName] = useState('');
    const [slug, setSlug] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [spotify, setSpotify] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login?type=artist');
            return;
        }

        // Check if user already has an artist profile
        checkExistingArtist();
    }, [user, authLoading, router]);

    async function checkExistingArtist() {
        if (!user) return;

        const { data } = await supabase
            .from('artists')
            .select('*')
            .eq('owner_id', user.id)
            .single();

        if (data) {
            // User already is an artist, redirect to dashboard
            router.push('/artist/dashboard');
        }
    }

    function handleBandNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setBandName(value);
        // Auto-generate slug
        const slugified = value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with -
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
        setSlug(slugified);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError('');

        try {
            const avatarUrl = await uploadAvatar(supabase as any, user.id, avatarFile);

            // Check if slug is already taken
            const { data: existing } = await supabase
                .from('artists')
                .select('slug')
                .eq('slug', slug)
                .single();

            if (existing) {
                setError('Este nome já está em uso. Tente outro.');
                setLoading(false);
                return;
            }

            // Create artist profile
            // Create artist profile
            const artistData: TablesInsert<'artists'> = {
                owner_id: user.id,
                name: bandName,
                slug: slug,
                whatsapp_contact: whatsapp || null,
                instagram_link: instagram || null,
                pix_key: spotify || null,
                avatar_url: avatarUrl,
            };

            const { error: insertError } = await (supabase
                .from('artists') as any)
                .insert(artistData);

            if (insertError) throw insertError;

            // Success! Redirect to dashboard
            router.push('/artist/dashboard');
        } catch (err: any) {
            console.error('Error creating artist:', err);
            setError(err.message || 'Erro ao criar perfil de artista');
            setLoading(false);
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-light">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-backdrop flex items-center justify-center py-12">
            <Container>
                <motion.div
                    variants={sectionEnter}
                    initial="hidden"
                    animate="visible"
                    className="max-w-lg mx-auto"
                >
                    <div className="text-center mb-8">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-accent rounded-full uppercase">
                            Área do Artista
                        </span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">
                            Crie seu perfil de artista
                        </h1>
                        <p className="text-primary-light">
                            Configure sua banda para começar a receber pedidos ao vivo
                        </p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-input text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2">Nome da Banda</label>
                                <Input
                                    type="text"
                                    value={bandName}
                                    onChange={handleBandNameChange}
                                    placeholder="Ex: Banda XYZ"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Link Personalizado</label>
                                <Input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="banda-xyz"
                                    required
                                    pattern="[a-z0-9-]+"
                                    title="Apenas letras minúsculas, números e hífens"
                                />
                                <p className="text-xs text-white/40 mt-1">
                                    Seu link será: tocaai.com/<strong>{slug || 'seu-link'}</strong>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">WhatsApp (opcional)</label>
                                <Input
                                    type="tel"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    placeholder="(11) 99999-9999"
                                />
                                <p className="text-xs text-white/40 mt-1">
                                    Para contato direto com os fãs
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Instagram (opcional)</label>
                                <Input
                                    type="text"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    placeholder="@seuinstagram ou link"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Spotify (opcional)</label>
                                <Input
                                    type="url"
                                    value={spotify}
                                    onChange={(e) => setSpotify(e.target.value)}
                                    placeholder="Link do artista no Spotify"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Foto (opcional)</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Criando perfil...' : 'Criar Perfil de Artista'}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </Container>
        </div>
    );
}
