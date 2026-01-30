// LOGIN PAGE - Email/Password authentication
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { sectionEnter } from '@/lib/animations';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
    const router = useRouter();
    const supabase = createClient();
    const searchParams = useSearchParams();
    const isArtist = searchParams.get('type') === 'artist';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
                return;
            }

            const userId = data.user.id;

            const accountType = (data.user.user_metadata as any)?.account_type as string | undefined;
            const shouldBeArtist = isArtist || accountType === 'artist';

            const { data: profileExisting } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', userId)
                .single();

            if (!profileExisting) {
                const meta = (data.user.user_metadata as any) || {};
                const profileInsert = {
                    id: userId,
                    email: data.user.email,
                    name: meta.name || null,
                    phone: meta.phone || null,
                };
                const { error: profileError } = await (supabase.from('profiles') as any).upsert(profileInsert);
                if (profileError) {
                    console.error('Profile upsert error:', profileError);
                }
            }

            // Check if user owns an artist
            const { data: artists } = await supabase
                .from('artists')
                .select('*')
                .eq('owner_id', data.user.id)
                .limit(1);

            if (artists && artists.length > 0) {
                router.push('/artist/dashboard');
                return;
            }

            if (shouldBeArtist) {
                router.push('/artist/register');
                return;
            }

            router.push('/me');
        } catch (err) {
            setError('Erro ao fazer login');
            setLoading(false);
        }
    }

    return (
        <motion.div
            variants={sectionEnter}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto"
        >
            <div className="text-center mb-8">
                {isArtist && (
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-accent rounded-full uppercase">
                        Área do Artista
                    </span>
                )}
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">
                    {isArtist ? 'Vamos fazer show?' : 'Entrar'}
                </h1>
                <p className="text-primary-light">
                    {isArtist
                        ? 'Gerencie seus eventos e receba pedidos'
                        : 'Acesse sua conta para fazer pedidos'}
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-input text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-accent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Senha</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-accent"
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : (isArtist ? 'Acessar Painel' : 'Entrar')}
                </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
                <a
                    href="/signup"
                    className="block text-sm text-accent hover:underline"
                >
                    Criar conta
                </a>
                <a
                    href="/forgot-password"
                    className="block text-sm text-primary-light hover:text-primary"
                >
                    Esqueci minha senha
                </a>
            </div>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen gradient-backdrop flex items-center justify-center">
            <Container>
                <Suspense fallback={<div className="text-center">Carregando...</div>}>
                    <LoginContent />
                </Suspense>
            </Container>
        </div>
    );
}
