import type { Metadata } from 'next';
import './globals.css';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { ConditionalHeader } from '@/components/layout/ConditionalHeader';
import { Inter } from 'next/font/google';
import type { Viewport } from 'next';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Toca Aí - Apareça no show',
    description: 'Peça uma música ou mande um recado. O artista recebe em tempo real.',
    icons: {
        icon: '/favicon.png',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                <AmbientBackground />
                <ConditionalHeader />
                <main className="relative z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
