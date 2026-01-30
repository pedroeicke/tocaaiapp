// USER PROFILE PAGE - View profile and request history
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import type { Profile, Request } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

import { EditProfileModal } from '@/components/EditProfileModal';

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading: authLoading, supabase } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        // Wait for auth to finish loading before making decisions
        if (authLoading) return;

        // If no user after auth loaded, redirect to login
        if (!user) {
            router.push('/login');
            return;
        }

        // User is authenticated, load data
        loadData();
    }, [user, authLoading, router]);

    async function loadData() {
        if (!user) return;

        try {
            // Load profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);

            // Load user's requests
            const { data: requestsData } = await supabase
                .from('requests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            setRequests(requestsData || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push('/');
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-light">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-display font-bold mb-8">Meu Perfil</h1>

                    {/* Profile Card */}
                    <Card className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-display font-semibold">
                                Informações
                            </h2>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="glass-button"
                                onClick={() => setIsEditing(true)}
                            >
                                ✎ Editar
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-primary-light">Nome</p>
                                <p className="font-medium">{profile?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-primary-light">Email</p>
                                <p className="font-medium">{profile?.email || user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button variant="ghost" onClick={handleLogout}>
                                Sair
                            </Button>
                        </div>
                    </Card>

                    {/* Requests History */}
                    <div>
                        <h2 className="text-2xl font-display font-semibold mb-4">
                            Meus Pedidos
                        </h2>

                        {requests.length === 0 ? (
                            <Card className="text-center py-12">
                                <p className="text-primary-light">Você ainda não fez nenhum pedido.</p>
                            </Card>
                        ) : (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {requests.map((request) => (
                                    <motion.div key={request.id} variants={staggerItem}>
                                        <Card>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium">{request.content}</p>
                                                    <p className="text-sm text-primary-light">
                                                        {request.guest_name}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant={
                                                        request.payment_status === 'PAID'
                                                            ? 'success'
                                                            : request.payment_status === 'FREE'
                                                                ? 'default'
                                                                : 'warning'
                                                    }
                                                >
                                                    {request.payment_status}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-primary-light">
                                                    {request.amount > 0
                                                        ? `R$ ${request.amount.toFixed(2)}`
                                                        : 'Grátis'}
                                                </span>
                                                <Badge
                                                    variant={
                                                        request.status === 'PLAYED'
                                                            ? 'success'
                                                            : request.status === 'ARCHIVED'
                                                                ? 'error'
                                                                : 'default'
                                                    }
                                                >
                                                    {request.status}
                                                </Badge>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </Container>

            <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                profile={profile}
                userEmail={user?.email}
                onUpdate={loadData}
            />
        </div>
    );
}
