// FORGOT PASSWORD PAGE - Request password reset
'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { sectionEnter } from '@/lib/animations';

export default function ForgotPasswordPage() {
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (resetError) {
                setError(resetError.message);
                setLoading(false);
                return;
            }

            setSent(true);
            setLoading(false);
        } catch (err) {
            setError('Erro ao enviar email');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen gradient-backdrop flex items-center justify-center">
            <Container>
                <motion.div
                    variants={sectionEnter}
                    initial="hidden"
                    animate="visible"
                    className="max-w-md mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-2 tracking-tight">
                        Esqueci minha senha
                    </h1>
                    <p className="text-primary-light text-center mb-8">
                        Digite seu email para receber instruções
                    </p>

                    {sent ? (
                        <div className="bg-green-50 border border-green-200 rounded-card p-6 text-center">
                            <p className="text-green-700">
                                Email enviado! Verifique sua caixa de entrada.
                            </p>
                            <a href="/login" className="block mt-4 text-accent hover:underline">
                                Voltar para login
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-input text-red-700 text-sm">
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
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar instruções'}
                            </Button>

                            <div className="text-center">
                                <a href="/login" className="text-sm text-accent hover:underline">
                                    Voltar para login
                                </a>
                            </div>
                        </form>
                    )}
                </motion.div>
            </Container>
        </div>
    );
}
