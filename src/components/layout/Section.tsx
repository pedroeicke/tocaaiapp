// Section Component - Section wrapper with spacing and optional gradient backgrounds
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { sectionEnter } from '@/lib/animations';

type SectionGradient = 'none' | 'section' | 'backdrop';

interface SectionProps {
    children: ReactNode;
    className?: string;
    gradient?: SectionGradient;
    animated?: boolean;
}

const gradientStyles: Record<SectionGradient, string> = {
    none: '',
    section: 'bg-transparent',
    backdrop: 'bg-black/40 backdrop-blur-3xl border-y border-white/5',
};

export function Section({
    children,
    className,
    gradient = 'none',
    animated = true,
}: SectionProps) {
    const Component = animated ? motion.section : 'section';
    const motionProps = animated
        ? {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true, amount: 0.25 },
            variants: sectionEnter,
        }
        : {};

    return (
        <Component
            className={cn(
                'py-section-mobile md:py-section relative',
                gradientStyles[gradient],
                className
            )}
            {...motionProps}
        >
            {children}
        </Component>
    );
}
