'use client';

import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { Profile, TablesUpdate } from '@/lib/supabase/types';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: Profile | null;
    userEmail?: string;
    onUpdate: () => void;
}

export function EditProfileModal({ isOpen, onClose, profile, userEmail, onUpdate }: EditProfileModalProps) {
    const supabase = createClient();
    const [name, setName] = useState(profile?.name || '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const updates: TablesUpdate<'profiles'> = {};
            if (name !== profile?.name) {
                updates.name = name;
            }

            // Update profile data
            if (Object.keys(updates).length > 0) {
                const { error } = await (supabase
                    .from('profiles') as any)
                    .update(updates)
                    .eq('id', profile?.id);

                if (error) throw error;
            }

            // Update password if provided
            if (password) {
                const { error } = await supabase.auth.updateUser({ password });
                if (error) throw error;
            }

            onUpdate();
            onClose();
            alert('Perfil atualizado com sucesso!');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert(`Erro ao atualizar perfil: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-display font-bold mb-6">Editar Perfil</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nome</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                            type="email"
                            value={userEmail || ''}
                            disabled
                            className="bg-white/5 opacity-50 cursor-not-allowed"
                            title="Para alterar o email, entre em contato com o suporte."
                        />
                        <p className="text-xs text-white/40 mt-1">O email não pode ser alterado diretamente.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Nova Senha (opcional)</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Deixe em branco para manter a atual"
                            minLength={6}
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="flex-1"
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
