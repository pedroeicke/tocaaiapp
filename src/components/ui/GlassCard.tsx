'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, onClick, hoverEffect = true }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02, y: -5 } : undefined}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "relative overflow-hidden rounded-card border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl",
                "hover:shadow-3xl hover:bg-white/10 transition-all duration-300",
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
