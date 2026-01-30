'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/client';
import { sectionEnter } from '@/lib/animations';
import { slugify } from '@/lib/signup/slugify';

export default function EstablishmentSignupPage() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [establishmentName, setEstablishmentName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');
    const [address, setAddress] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSent(false);

        if (!establishmentName.trim()) {
            setError('Preencha o nome do estabelecimento');
            return;
        }

        if (!whatsapp.trim()) {
            setError('Preencha o WhatsApp');
            return;
        }

        if (!instagram.trim()) {
            setError('Preencha o Instagram');
            return;
        }

        if (!address.trim()) {
            setError('Preencha o endereço');
            return;
        }

        setLoading(true);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                    data: {
                        account_type: 'establishment',
                        name: fullName.trim(),
                        phone: phone.trim(),
                        establishment_name: establishmentName.trim(),
                        establishment_slug: slugify(establishmentName.trim()),
                        whatsapp: whatsapp.trim(),
                        instagram: instagram.trim(),
                        address: address.trim(),
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            const userId = data.user?.id;
            if (userId) {
                const { error: profileError } = await (supabase.from('profiles') as any).upsert({
                    id: userId,
                    email: email.trim(),
                    name: fullName.trim(),
                    phone: phone.trim() || null,
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
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">Estabelecimento</h1>
                        <p className="text-primary-light">Crie sua conta para começar</p>
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
                                    <label className="block text-sm font-medium mb-2">Seu nome</label>
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

                                <div>
                                    <label className="block text-sm font-medium mb-2">Nome do estabelecimento</label>
                                    <Input
                                        type="text"
                                        value={establishmentName}
                                        onChange={(e) => setEstablishmentName(e.target.value)}
                                        required
                                        placeholder="Ex: Bar do Zé"
                                    />
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
                                    <label className="block text-sm font-medium mb-2">Endereço</label>
                                    <Input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="Rua, número, bairro, cidade"
                                    />
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
