// DonationPicker Component - Amount selection with chips
'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { DonationMode } from '@/lib/supabase/types';

interface DonationPickerProps {
    mode: DonationMode;
    minValue: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

const PRESET_VALUES = [0, 5, 10, 20, 50];

// Format cents to BRL currency string: 10056 -> "100,56", 200000 -> "2.000,00"
function formatCurrency(cents: number): string {
    if (cents === 0) return '';

    const reais = cents / 100;
    return reais.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Parse display string to cents: "100,56" -> 10056
function parseToCents(display: string): number {
    // Remove everything except digits
    const digits = display.replace(/\D/g, '');
    return parseInt(digits, 10) || 0;
}

// Convert cents to reais for the onChange callback
function centsToReais(cents: number): number {
    return cents / 100;
}

export function DonationPicker({
    mode,
    minValue,
    value,
    onChange,
    className,
}: DonationPickerProps) {
    const [customValue, setCustomValue] = useState('');
    const [showCustom, setShowCustom] = useState(false);

    const availablePresets = mode === 'OPTIONAL'
        ? PRESET_VALUES
        : PRESET_VALUES.filter(v => v >= minValue);

    const handlePresetClick = (presetValue: number) => {
        setShowCustom(false);
        setCustomValue('');
        onChange(presetValue);
    };

    const handleCustomClick = () => {
        setShowCustom(true);
        onChange(0);
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const cents = parseToCents(input);
        const formatted = formatCurrency(cents);
        setCustomValue(formatted);
        onChange(centsToReais(cents));
    };

    return (
        <div className={className}>
            <div className="mb-2 text-sm text-white/60">
                {mode === 'MANDATORY' && `Valor mínimo: R$ ${minValue.toFixed(2)}`}
                {mode === 'OPTIONAL' && 'Escolha um valor (ou R$ 0 para mensagem grátis)'}
            </div>

            <div className="flex flex-wrap gap-2">
                {availablePresets.map((presetValue) => (
                    <button
                        key={presetValue}
                        type="button"
                        onClick={() => handlePresetClick(presetValue)}
                        className={cn(
                            'px-6 py-3 rounded-pill border-2 transition-all font-medium hover:scale-[1.02] active:scale-[0.98]',
                            value === presetValue && !showCustom
                                ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                                : 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                        )}
                    >
                        {presetValue === 0 ? 'Grátis' : `R$ ${presetValue}`}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={handleCustomClick}
                    className={cn(
                        'px-6 py-3 rounded-pill border-2 transition-all font-medium hover:scale-[1.02] active:scale-[0.98]',
                        showCustom
                            ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                            : 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                    )}
                >
                    Outro valor
                </button>
            </div>

            {showCustom && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative flex items-center">
                        <span className="absolute left-4 text-white/60 font-medium pointer-events-none">
                            R$
                        </span>
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="0,00"
                            value={customValue}
                            onChange={handleCustomChange}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-lg font-medium"
                        />
                    </div>
                </div>
            )}

            {mode === 'MANDATORY' && value > 0 && value < minValue && (
                <p className="mt-2 text-sm text-accent">
                    O valor mínimo é R$ {minValue.toFixed(2)}
                </p>
            )}
        </div>
    );
}
