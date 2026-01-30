'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface GradientCardProps {
    children?: ReactNode;
    icon?: LucideIcon;
    className?: string;
    onClick?: () => void;
    title?: string;
    description?: string;
}

export function GradientCard({
    children,
    icon: Icon,
    className,
    onClick,
    title,
    description
}: GradientCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "relative overflow-hidden rounded-[2rem] p-8", // More rounded corners for the 'pill' look
                "bg-gradient-to-br from-[#FF8C37] via-[#FA233B] to-[#FF4A6E]", // Vibrant Orange -> Red -> Pink
                "shadow-2xl shadow-orange-500/20",
                "flex flex-col items-start justify-between min-h-[200px]",
                className
            )}
            onClick={onClick}
        >
            {/* Background Texture/Noise for premium feel */}
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay opacity-50" />

            {/* Content Container */}
            <div className="relative z-10 w-full">
                {Icon && (
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                )}

                {title && (
                    <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">
                        {title}
                    </h3>
                )}

                {description && (
                    <p className="text-white/90 font-medium leading-relaxed">
                        {description}
                    </p>
                )}

                {children}
            </div>

            {/* Shine Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </motion.div>
    );
}
