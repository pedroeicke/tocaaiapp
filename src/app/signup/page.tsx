'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Music2, Building2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { sectionEnter } from '@/lib/animations';

type AccountType = 'user' | 'artist' | 'establishment';

const TYPE_TO_PATH: Record<AccountType, string> = {
    user: '/signup/user',
    artist: '/signup/artist',
    establishment: '/signup/estabelecimento',
};

export default function SignupSelectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const type = searchParams.get('type') as AccountType | null;
        if (type && TYPE_TO_PATH[type]) {
            router.replace(TYPE_TO_PATH[type]);
        }
    }, [router, searchParams]);

    return (
        <div className="min-h-screen gradient-backdrop pt-28 md:pt-32 pb-12">
            <Container>
                <motion.div variants={sectionEnter} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tight">Criar conta</h1>
                        <p className="text-primary-light">Escolha o tipo de conta para continuar</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-7 md:p-8 min-h-[240px]" hoverable>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-display font-semibold whitespace-nowrap">Usuário</h2>
                                </div>
                                <p className="text-sm text-primary-light mb-6 flex-1">Para fazer pedidos e acompanhar seu histórico.</p>
                                <Link href="/signup/user" className="w-full">
                                    <Button variant="primary" className="w-full">Continuar</Button>
                                </Link>
                            </div>
                        </Card>

                        <Card className="p-7 md:p-8 min-h-[240px]" hoverable>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Music2 className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-display font-semibold whitespace-nowrap">Banda / Artista</h2>
                                </div>
                                <p className="text-sm text-primary-light mb-6 flex-1">Para ativar o modo ao vivo e receber pedidos.</p>
                                <Link href="/signup/artist" className="w-full">
                                    <Button variant="primary" className="w-full">Continuar</Button>
                                </Link>
                            </div>
                        </Card>

                        <Card className="p-7 md:p-8 min-h-[240px]" hoverable>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-display font-semibold whitespace-nowrap">Estabelecimento</h2>
                                </div>
                                <p className="text-sm text-primary-light mb-6 flex-1">Para gerir seu local e conectar artistas.</p>
                                <Link href="/signup/estabelecimento" className="w-full">
                                    <Button variant="primary" className="w-full">Continuar</Button>
                                </Link>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/login" className="text-sm text-accent hover:underline">
                            Já tenho conta
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}
