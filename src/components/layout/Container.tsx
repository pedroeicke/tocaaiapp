// Container Component - Max-width container with responsive padding
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn('max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8', className)}>
            {children}
        </div>
    );
}
