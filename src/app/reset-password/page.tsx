// RESET PASSWORD PAGE - Set new password
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { sectionEnter } from '@/lib/animations';

export default function ResetPasswordPage() {
    const router = useRouter();
    const supabase = createClient();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password,
            });

            if (updateError) {
                setError(updateError.message);
                setLoading(false);
                return;
            }

            alert('Senha atualizada com sucesso!');
            router.push('/login');
        } catch (err) {
            setError('Erro ao atualizar senha');
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
                        Nova senha
                    </h1>
                    <p className="text-primary-light text-center mb-8">
                        Digite sua nova senha
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-input text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Nova senha</label>
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

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : 'Salvar nova senha'}
                        </Button>
                    </form>
                </motion.div>
            </Container>
        </div>
    );
}
