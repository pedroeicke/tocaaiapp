// Footer Component - Simple footer with links
'use client';

import { Container } from './Container';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white/40 text-sm">
                        © {new Date().getFullYear()} Toca Aí. Todos os direitos reservados.
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm">
                        <a href="/termos" className="text-white/60 hover:text-white transition-colors">
                            Termos de Uso
                        </a>
                        <a href="/privacidade" className="text-white/60 hover:text-white transition-colors">
                            Privacidade
                        </a>
                        <a href="/faq" className="text-white/60 hover:text-white transition-colors">
                            FAQ
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
