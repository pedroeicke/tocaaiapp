// Badge Component - Status pills
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'live' | 'default' | 'success' | 'warning' | 'error';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    live: 'bg-accent/20 text-accent border border-accent/20 animate-pulse',
    default: 'bg-white/10 text-white border border-white/10',
    success: 'bg-green-500/20 text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20',
    error: 'bg-red-500/20 text-red-400 border border-red-500/20',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-pill text-xs font-medium',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
