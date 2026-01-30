'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/client';
import { sectionEnter } from '@/lib/animations';
import { uploadAvatar } from '@/lib/signup/uploadAvatar';

export default function ArtistSignupPage() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [spotifyLink, setSpotifyLink] = useState('');
    const [genres, setGenres] = useState<string[]>([]);

    const genreOptions = [
        'Pop',
        'Rock',
        'Sertanejo',
        'Pagode',
        'Samba',
        'Funk',
        'Rap / Hip-Hop',
        'Eletrônica',
        'MPB',
        'Forró',
        'Gospel',
        'Reggae',
        'Indie',
        'Metal',
    ];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    function toggleGenre(label: string) {
        setGenres((current) => (current.includes(label) ? current.filter((g) => g !== label) : [...current, label]));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSent(false);

        if (genres.length === 0) {
            setError('Selecione pelo menos um gênero musical');
            return;
        }

        setLoading(true);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login?type=artist`,
                    data: {
                        account_type: 'artist',
                        name: fullName.trim(),
                        phone: phone.trim(),
                        whatsapp: whatsapp.trim(),
                        instagram: instagram.trim(),
                        spotify_link: spotifyLink.trim(),
                        genres,
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            const userId = data.user?.id;
            let avatarUrl: string | null = null;

            if (userId) {
                avatarUrl = await uploadAvatar(supabase as any, userId, avatarFile);
                const { error: profileError } = await (supabase.from('profiles') as any).upsert({
                    id: userId,
                    email: email.trim(),
                    name: fullName.trim(),
                    phone: phone.trim() || null,
                    avatar_url: avatarUrl,
                });
                if (profileError) {
                    console.error('Profile upsert error:', profileError);
                }
            }

            if (data.session) {
                router.push('/artist/register');
                return;
            }

            setSent(true);
        } catch (err: any) {
            setError(err?.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen gradient-backdrop pt-28 md:pt-32 pb-12">
            <Container>
                <motion.div variants={sectionEnter} initial="hidden" animate="visible" className="max-w-lg mx-auto">
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-accent rounded-full uppercase">
                            Área do Artista
                        </span>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">Criar conta</h1>
                        <p className="text-primary-light">Crie sua conta e já configure sua banda</p>
                    </div>

                    {sent ? (
                        <div className="bg-green-50 border border-green-200 rounded-card p-6 text-center">
                            <p className="text-green-700">Conta criada! Verifique seu email para confirmar.</p>
                            <Link href="/login?type=artist" className="block mt-4 text-accent hover:underline">
                                Ir para login do artista
                            </Link>
                        </div>
                    ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-input text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">Nome da banda / artista</label>
                                    <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Telefone</label>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">WhatsApp</label>
                                        <Input
                                            type="tel"
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            required
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Instagram</label>
                                        <Input
                                            type="text"
                                            value={instagram}
                                            onChange={(e) => setInstagram(e.target.value)}
                                            required
                                            placeholder="@seuinstagram ou link"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Spotify</label>
                                    <Input
                                        type="url"
                                        value={spotifyLink}
                                        onChange={(e) => setSpotifyLink(e.target.value)}
                                        required
                                        placeholder="Link do artista no Spotify"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Gêneros musicais</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {genreOptions.map((label) => (
                                            <label
                                                key={label}
                                                className="flex items-center gap-2 px-3 py-2 rounded-input bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={genres.includes(label)}
                                                    onChange={() => toggleGenre(label)}
                                                    className="accent-red-500"
                                                />
                                                <span className="text-sm text-white/80">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Senha</label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Foto (opcional)</label>
                                    <label className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 text-white border border-white/10 rounded-input cursor-pointer hover:bg-white/10 transition-all">
                                        <Upload className="w-4 h-4" />
                                        <span className="text-sm text-white/80">{avatarFile ? avatarFile.name : 'Selecionar imagem'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                                        />
                                    </label>
                                </div>

                                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                                    {loading ? 'Criando...' : 'Criar conta'}
                                </Button>

                                <div className="text-center">
                                    <Link href="/signup" className="text-sm text-primary-light hover:text-primary">
                                        Voltar
                                    </Link>
                                </div>
                            </form>
                        </Card>
                    )}
                </motion.div>
            </Container>
        </div>
    );
}
