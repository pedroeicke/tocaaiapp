'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Artist, Profile } from '@/lib/supabase/types';
import { Menu, X, Search, LogIn, User } from 'lucide-react';

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, supabase } = useAuth();
    const [userName, setUserName] = useState<string | null>(null);
    const [userType, setUserType] = useState<'guest' | 'user' | 'artist'>('guest');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                setUserName(null);
                setUserType('guest');
                return;
            }

            // 1. Check if user is an artist
            const { data: artist } = await supabase
                .from('artists')
                .select('name')
                .eq('owner_id', user.id)
                .single();

            if (artist) {
                setUserName((artist as unknown as Artist).name);
                setUserType('artist');
                return;
            }

            // 2. If not artist, get profile name
            const { data: profile } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', user.id)
                .single();

            if (profile) {
                setUserName((profile as unknown as Profile).name || 'Usuário');
                setUserType('user');
            }
        }

        loadProfile();
    }, [user, supabase]);

    const handleArtistClick = () => {
        if (!user) {
            // Not logged in - go to login
            router.push('/login?type=artist');
        } else if (userType === 'artist') {
            // Already an artist - go to dashboard
            router.push('/artist/dashboard');
        } else {
            // Logged in but not an artist - go to registration
            router.push('/artist/register');
        }
    };

    const isHome = pathname === '/';
    const showLogo = !isHome || scrolled;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
                scrolled
                    ? 'bg-black/50 backdrop-blur-md border-b border-white/5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4'
                    : 'bg-transparent pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className={cn("transition-opacity duration-300", showLogo ? "opacity-100" : "opacity-0 pointer-events-none")}>
                    <div className="relative w-24 h-8">
                        <Image
                            src="/logotocai.svg"
                            alt="Toca Aí"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/buscar" className="text-sm text-white/70 hover:text-white transition-colors">
                            Encontre a banda
                        </Link>
                        {!loading && !user && (
                            <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">
                                Login
                            </Link>
                        )}

                        {!loading && user && (
                            <Link
                                href="/me"
                                className="text-sm font-medium text-white hover:text-accent transition-colors"
                            >
                                Olá, {userName || 'Usuário'}
                            </Link>
                        )}
                    </nav>

                    <Button
                        variant={userType === 'artist' ? 'primary' : 'secondary'}
                        className={`text-sm px-6 h-10 hidden md:inline-flex ${userType !== 'artist' ? 'glass-button' : ''}`}
                        onClick={handleArtistClick}
                    >
                        {userType === 'artist' ? 'Dashboard' : 'Sou Artista'}
                    </Button>

                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        onClick={() => setMobileMenuOpen((v) => !v)}
                        aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[150] md:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/60"
                        aria-label="Fechar menu"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    <div className="absolute left-3 right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] rounded-card border border-white/10 bg-black/85 backdrop-blur-md overflow-hidden">
                        <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative w-20 h-6">
                                    <Image src="/logotocai.svg" alt="Toca Aí" fill className="object-contain" />
                                </div>
                                <span className="text-xs text-white/50">Menu</span>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Fechar"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-2">
                            <Link
                                href="/buscar"
                                className="w-full flex items-center gap-3 px-4 py-4 rounded-input text-white/90 hover:bg-white/5 transition-all"
                            >
                                <Search className="w-5 h-5 text-white/70" />
                                <span className="text-base font-medium">Encontre a banda</span>
                            </Link>

                            {!loading && !user && (
                                <Link
                                    href="/login"
                                    className="w-full flex items-center gap-3 px-4 py-4 rounded-input text-white/90 hover:bg-white/5 transition-all"
                                >
                                    <LogIn className="w-5 h-5 text-white/70" />
                                    <span className="text-base font-medium">Login</span>
                                </Link>
                            )}

                            {!loading && user && (
                                <Link
                                    href="/me"
                                    className="w-full flex items-center gap-3 px-4 py-4 rounded-input text-white/90 hover:bg-white/5 transition-all"
                                >
                                    <User className="w-5 h-5 text-white/70" />
                                    <span className="text-base font-medium">Olá, {userName || 'Usuário'}</span>
                                </Link>
                            )}

                            <div className="p-2">
                                <Button
                                    variant={userType === 'artist' ? 'primary' : 'secondary'}
                                    className={`w-full h-12 ${userType !== 'artist' ? 'glass-button' : ''}`}
                                    onClick={handleArtistClick}
                                >
                                    {userType === 'artist' ? 'Dashboard' : 'Sou Artista'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
