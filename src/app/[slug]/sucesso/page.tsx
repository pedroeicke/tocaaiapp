// SUCCESS PAGE - Request confirmation
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Request } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import { checkmarkAnimation } from '@/lib/animations';

export default function SuccessPage({ params }: { params: { slug: string } }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const requestId = searchParams.get('request_id');
    const supabase = createClient();

    const [request, setRequest] = useState<Request | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!requestId) {
            router.push(`/${params.slug}`);
            return;
        }

        loadRequestData(requestId);
    }, [requestId]);

    async function loadRequestData(id: string) {
        try {
            const { data } = await supabase
                .from('requests')
                .select('*')
                .eq('id', id)
                .single();

            setRequest(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading request:', error);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-light">Carregando...</div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold mb-4">Pedido não encontrado</h1>
                        <Button onClick={() => router.push(`/${params.slug}`)}>Voltar</Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-backdrop flex items-center justify-center">
            <Container>
                <div className="max-w-lg mx-auto text-center">
                    {/* Animated Checkmark */}
                    <motion.div
                        variants={checkmarkAnimation}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white"
                    >
                        <svg
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Pedido enviado!
                    </h1>

                    <div className="bg-white rounded-card p-6 mb-6 text-left text-gray-900">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Nome</p>
                                <p className="font-medium text-gray-900">{request.guest_name}</p>
                            </div>
                            {request.content && (
                                <div>
                                    <p className="text-sm text-gray-500">Mensagem</p>
                                    <p className="font-medium text-gray-900 break-words whitespace-pre-wrap">{request.content}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">Valor</p>
                                <p className="font-medium text-gray-900">
                                    {request.amount > 0
                                        ? `R$ ${request.amount.toFixed(2)}`
                                        : 'Grátis'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium text-gray-900">
                                    {request.payment_status === 'PAID' && 'Confirmado'}
                                    {request.payment_status === 'FREE' && '✓ Enviado (grátis)'}
                                    {request.payment_status === 'WAITING' && '⏳ Aguardando pagamento'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-primary-light mb-6">
                        Seu pedido foi recebido e aparecerá na fila do artista!
                    </p>

                    <Button
                        onClick={() => router.push(`/${params.slug}`)}
                        variant="primary"
                        size="lg"
                    >
                        Enviar outro pedido
                    </Button>
                </div>
            </Container>
        </div>
    );
}
