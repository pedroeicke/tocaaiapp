'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AmbientBackground() {
    const [mounted, setMounted] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            // Only show lights after scrolling past the hero and benefits (approx 800px)
            if (window.scrollY > 800) {
                setOpacity(1);
            } else {
                setOpacity(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!mounted) return <div className="fixed inset-0 bg-black -z-50" />;

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Top Area Mask - Ensures black background behind initial content/video connection */}
            <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

            {/* Lights Removed as per user request */}

            {/* Global Noise Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
        </div>
    );
}
