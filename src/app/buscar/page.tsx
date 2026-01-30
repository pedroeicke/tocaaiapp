// SEARCH PAGE - Find artist by slug
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SearchInput } from '@/components/SearchInput';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { sectionEnter } from '@/lib/animations';

export default function SearchPage() {
    const router = useRouter();
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        // Load recent searches from localStorage
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    const handleSearch = (slug: string) => {
        // Save to recent searches
        const updated = [slug, ...recentSearches.filter(s => s !== slug)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        router.push(`/${slug}`);
    };

    const handleRecentClick = (slug: string) => {
        router.push(`/${slug}`);
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/herovideo.mp4" type="video/mp4" />
                </video>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/80" />
                {/* Bottom Gradient - darker at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
            </div>

            <Section className="flex-1 flex items-start md:items-center relative z-10 py-0 pt-28 md:pt-0 pb-12">
                <Container>
                    <motion.div
                        variants={sectionEnter}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl mx-auto"
                    >

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 md:mb-4 tracking-tight">
                            Encontre a banda
                        </h1>
                        <p className="text-base sm:text-lg text-primary-light text-center mb-7 md:mb-8">
                            Digite o nome da banda para acessar a página do evento
                        </p>

                        <SearchInput onSearch={handleSearch} />

                        {recentSearches.length > 0 && (
                            <div className="mt-8">
                                <p className="text-sm text-primary-light mb-3">Buscas recentes:</p>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((slug) => (
                                        <button
                                            key={slug}
                                            onClick={() => handleRecentClick(slug)}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-pill text-sm text-white hover:border-accent hover:bg-white/10 transition-all max-w-[70vw] sm:max-w-none truncate"
                                        >
                                            {slug}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </Container>
            </Section>
            <Footer />
        </div>
    );
}
