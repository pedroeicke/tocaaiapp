// PixModal Component - Payment modal with real-time confirmation
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useRealtime } from '@/hooks/useRealtime';
import type { Request } from '@/lib/supabase/types';

interface PixModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestId: string;
    eventId: string;
    qrCode: string | null;
    qrCodeBase64: string | null;
    artistSlug: string;
}

export function PixModal({
    isOpen,
    onClose,
    requestId,
    eventId,
    qrCode,
    qrCodeBase64,
    artistSlug,
}: PixModalProps) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    // Listen for payment confirmation via realtime
    useRealtime({
        eventId,
        onUpdate: (request: Request) => {
            if (request.id === requestId && request.payment_status === 'PAID') {
                // Payment confirmed! Close modal and navigate to success
                onClose();
                // Force navigation to ensure it works
                window.location.href = `/${artistSlug}/sucesso?request_id=${requestId}`;
            }
        },
    });

    const handleCopy = async () => {
        if (!qrCode) return;

        try {
            await navigator.clipboard.writeText(qrCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="p-5 sm:p-8">
            <div className="text-center">
                <h2 className="text-2xl font-display font-semibold mb-2">
                    Pague com Pix
                </h2>
                <p className="text-white/60 mb-6">
                    Escaneie o QR Code ou copie o código Pix
                </p>

                {/* QR Code */}
                {qrCodeBase64 && (
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white p-4 rounded-card border border-border inline-block">
                            <Image
                                src={`data:image/png;base64,${qrCodeBase64}`}
                                alt="QR Code Pix"
                                width={240}
                                height={240}
                                className="w-[min(60vw,240px)] h-auto"
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                {/* Copy Code Button */}
                {qrCode && (
                    <>
                        <Button
                            onClick={handleCopy}
                            variant="primary"
                            size="lg"
                            className="w-full mb-4"
                        >
                            {copied ? '✓ Código copiado!' : 'Copiar código Pix'}
                        </Button>

                        {/* Collapsible Pix Code */}
                        <details className="mb-4 text-left">
                            <summary className="cursor-pointer text-sm text-white/60 hover:text-white/80 transition-colors text-center">
                                Ver código Pix
                            </summary>
                            <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                <code className="block text-xs break-all text-white/80 font-mono">
                                    {qrCode}
                                </code>
                            </div>
                        </details>
                    </>
                )}

                {/* Status */}
                <div className="flex items-center justify-center gap-2 text-white/60 mb-6">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-sm">Aguardando confirmação...</span>
                </div>

                {/* Info */}
                <p className="text-xs text-white/40">
                    A confirmação é automática. Assim que o pagamento for identificado,
                    sua mensagem aparecerá para o artista.
                </p>
            </div>
        </Modal>
    );
}
