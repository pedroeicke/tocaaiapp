'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';

// Routes that should NOT show the global header
const ROUTES_WITHOUT_HEADER = [
    '/artist/live',
];

// Check if pathname is a dynamic artist page (starts with / and has no nested paths except /sucesso)
function isArtistSlugPage(pathname: string): boolean {
    // Skip known app routes
    const appRoutes = ['/buscar', '/login', '/signup', '/forgot-password', '/reset-password', '/me', '/artist', '/', '/souartista'];
    if (appRoutes.includes(pathname)) return false;

    // Check if it's a slug page: /something or /something/sucesso
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) return true; // /bandateste
    if (segments.length === 2 && segments[1] === 'sucesso') return true; // /bandateste/sucesso

    return false;
}

export function ConditionalHeader() {
    const pathname = usePathname();

    // Hide header on specific routes and artist slug pages
    if (ROUTES_WITHOUT_HEADER.includes(pathname) || isArtistSlugPage(pathname)) {
        return null;
    }

    return <Header />;
}
