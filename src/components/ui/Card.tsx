// Card Component - Premium card with hover effects
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode;
    hoverable?: boolean;
    className?: string;
}

export function Card({ children, hoverable = false, className, ...props }: CardProps) {
    const motionProps = hoverable
        ? {
            initial: 'rest',
            whileHover: 'hover',
            variants: cardHover,
        }
        : {};

    return (
        <motion.div
            className={cn(
                'glass-card rounded-card p-6 md:p-8',
                hoverable && 'hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer',
                className
            )}
            {...motionProps}
            {...props}
        >
            {children}
        </motion.div>
    );
}
