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

export default function UserSignupPage() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSent(false);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setLoading(true);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                    data: { name: name.trim(), phone: phone.trim(), account_type: 'user' },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            const userId = data.user?.id;
            if (userId) {
                const avatarUrl = await uploadAvatar(supabase as any, userId, avatarFile);
                const { error: profileError } = await (supabase.from('profiles') as any).upsert({
                    id: userId,
                    email: email.trim(),
                    name: name.trim(),
                    phone: phone.trim() || null,
                    avatar_url: avatarUrl,
                });
                if (profileError) {
                    console.error('Profile upsert error:', profileError);
                }
            }

            if (data.session) {
                router.push('/me');
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
                <motion.div variants={sectionEnter} initial="hidden" animate="visible" className="max-w-md mx-auto">
                    <div className="text-center mb-10 md:mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">Conta de usuário</h1>
                        <p className="text-primary-light">Crie sua conta para acompanhar pedidos</p>
                    </div>

                    {sent ? (
                        <div className="bg-green-50 border border-green-200 rounded-card p-6 text-center">
                            <p className="text-green-700">Conta criada! Verifique seu email para confirmar.</p>
                            <Link href="/login" className="block mt-4 text-accent hover:underline">
                                Ir para login
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
                                    <label className="block text-sm font-medium mb-2">Nome</label>
                                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
                                    <label className="block text-sm font-medium mb-2">Confirmar senha</label>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
