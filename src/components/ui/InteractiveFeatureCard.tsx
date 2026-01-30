'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface InteractiveFeatureCardProps {
    mainImage: string;
    eyebrow: string;
    headline: string;
    caption: string;
    modalContent: {
        title: string;
        description: React.ReactNode;
        image?: string;
    };
}

export function InteractiveFeatureCard({
    mainImage,
    eyebrow,
    headline,
    caption,
    modalContent
}: InteractiveFeatureCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[2.4/1] rounded-[2.5rem] bg-zinc-900 overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-orange-500/10">
            {/* Main Content (Always visible background, but covered when open) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={mainImage}
                    alt={headline}
                    fill
                    className={cn(
                        "object-cover object-[center_35%] transition-transform duration-700",
                        isOpen ? "scale-105 blur-sm opacity-40" : "scale-100 opacity-60 group-hover:scale-105"
                    )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Text Overlay (Hidden when open) */}
            <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 z-10"
                animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
                transition={{ duration: 0.4 }}
            >
                <motion.h3 className="text-sm md:text-base font-medium text-orange-500 uppercase tracking-wider mb-2">
                    {eyebrow}
                </motion.h3>
                <motion.h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-2 leading-tight max-w-3xl">
                    {headline}
                </motion.h2>
                <motion.p className="text-white/60 font-medium">
                    {caption}
                </motion.p>
            </motion.div>

            {/* Expanded Content (Visible when open) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center p-5 sm:p-8 md:p-20"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto w-full">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1"
                            >
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                                    {modalContent.title}
                                </h3>
                                <div className="text-lg text-white/80 leading-relaxed font-light">
                                    {modalContent.description}
                                </div>
                            </motion.div>

                            {/* Secondary Image (iPhone Mockup style or similar) if provided */}
                            {modalContent.image && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex-1 relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                >
                                    <Image
                                        src={modalContent.image}
                                        alt="Detalhe"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label={isOpen ? "Fechar" : "Saber mais"}
            >
                <div className="relative w-6 h-6">
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Plus size={24} />
                    </motion.div>
                </div>
            </button>
        </div>
    );
}
