'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'danger';
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'default'
}: ConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm !bg-transparent !border-0 !shadow-none !backdrop-filter-none">
            <div className="text-center pt-2">
                <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
                <p className="text-white/70 mb-6 text-sm leading-relaxed">{message}</p>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="w-full bg-white/5 border-white/10 hover:bg-white/10"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-full shadow-lg shadow-red-500/20"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
