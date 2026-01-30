// SearchInput Component - Reusable search input
'use client';

import { useState, FormEvent } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface SearchInputProps {
    onSearch: (slug: string) => void;
    placeholder?: string;
    buttonText?: string;
    className?: string;
}

export function SearchInput({
    onSearch,
    placeholder = 'Digite o nome da banda',
    buttonText = 'Entrar',
    className,
}: SearchInputProps) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            // Convert to slug: lowercase, remove accents, replace spaces with hyphens
            const slug = value
                .trim()
                .toLowerCase()
                .normalize('NFD') // Decompose combined characters (accents)
                .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/[^a-z0-9-]/g, ''); // Remove other special chars

            onSearch(slug);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn('flex flex-col sm:flex-row gap-2', className)}>
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="flex-1"
            />
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                {buttonText}
            </Button>
        </form>
    );
}
