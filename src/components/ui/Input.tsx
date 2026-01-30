// Input Component - Styled form input
'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-input',
                        'text-white placeholder:text-white/40',
                        'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                        'transition-all duration-200',
                        error && 'border-accent focus:ring-accent',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-accent">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
