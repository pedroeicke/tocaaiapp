// Toast Component - Notification system
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

const typeStyles: Record<ToastType, string> = {
    success: 'bg-green-500/80 backdrop-blur-md text-white border border-green-400/20',
    error: 'bg-accent/80 backdrop-blur-md text-white border border-accent/20',
    info: 'bg-blue-500/80 backdrop-blur-md text-white border border-blue-400/20',
};

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className={cn(
                'px-6 py-3 rounded-pill shadow-lg',
                typeStyles[type]
            )}
        >
            {message}
        </motion.div>
    );
}

// Toast Container
interface ToastContainerProps {
    toasts: Array<{ id: string; message: string; type?: ToastType }>;
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => onRemove(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
