// @ts-nocheck
// ARTIST LANDING PAGE
'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { InteractiveFeatureCard } from '@/components/ui/InteractiveFeatureCard';
// @ts-ignore
import {
    DollarSign,
    Music2,
    Settings,
    Zap,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Heart,
    Users
} from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    visible: { transition: { staggerChildren: 0.1 } }
};

export default function ArtistLandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/videoheroartista.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
                </div>

                <Container className="relative z-10 pt-[calc(env(safe-area-inset-top)+6.5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] md:pt-0 md:pb-0">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
                            <Badge variant="default" className="text-sm px-4 py-2 border-white/20 bg-white/5 backdrop-blur-md">
                                Ferramenta de Palco Profissional
                            </Badge>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-5 md:mb-6 tracking-tight leading-tight">
                            Seu show não precisa ser só ouvido.
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">
                                Ele pode ser interativo.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/70 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                            O Toca Aí transforma pedidos de fãs em engajamento real e receita extra em tempo real, direto no palco.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
                            <Link href="/login?type=artist" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto max-w-sm shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)]">
                                    Quero ativar no meu show
                                </Button>
                            </Link>
                            <p className="text-sm text-white/40">
                                Sem mensalidade. Sem risco. Você só ganha quando usa.
                            </p>
                        </motion.div>
                    </motion.div>
                </Container>
            </div>

            {/* 2. MONETIZATION SECTION */}
            <Section className="relative z-10">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                            Cada pedido pode virar receita.
                        </h2>
                        <p className="text-xl text-white/60">
                            Enquanto o show acontece, o caixa continua girando.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<DollarSign className="w-8 h-8 text-white" />}
                            title="Pedidos pagos em tempo real"
                            description="Fãs apoiam com Pix para pedir músicas ou mandar recados de forma destacada."
                            gradient="from-orange-500 to-pink-600"
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-white" />}
                            title="Receita além do cachê"
                            description="Ganhe durante o show, não só antes dele. Uma nova fonte de renda recorrente."
                            gradient="from-purple-500 via-pink-500 to-red-500"
                        />
                        <FeatureCard
                            icon={<Settings className="w-8 h-8 text-white" />}
                            title="Valor mínimo definido por você"
                            description="Você escolhe quanto vale um pedido. Pode ser R$ 5, R$ 10 ou R$ 50."
                            gradient="from-blue-500 to-purple-600"
                        />
                    </div>
                </Container>
            </Section>

            {/* 3. CONTROL SECTION */}
            {/* 3. CONTROL SECTION */}
            <Section>
                <Container>
                    <InteractiveFeatureCard
                        mainImage="/fotosecaomusico.jpg"
                        eyebrow="Controle Total"
                        headline="Você decide o repertório."
                        caption="Dashboard do Artista"
                        modalContent={{
                            title: "Gestão Completa do Show",
                            description: (
                                <div className="space-y-4">
                                    <p>
                                        Assuma o controle total da sua apresentação. Com nosso dashboard intuitivo, você gerencia cada aspecto da interação em tempo real.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            Aceite ou recuse pedidos instantaneamente
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            Pause a fila quando precisar de um respiro
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            Visualize o ranking de músicas mais pedidas
                                        </li>
                                    </ul>
                                </div>
                            )
                        }}
                    />
                </Container>
            </Section>

            {/* 4. SIMPLICITY SECTION */}
            <Section>
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Feito para funcionar ao vivo.</h2>
                        <p className="text-xl text-white/60">Sem gritaria. Sem confusão. Sem intermediários.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Line Background (Inactive) */}
                        <div className="absolute top-[3rem] left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 hidden md:block" />

                        {/* Connecting Line Progress (Active) */}
                        <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="absolute top-[3rem] left-0 h-[2px] bg-gradient-to-r from-accent/50 via-accent to-accent/50 -translate-y-1/2 hidden md:block z-0"
                        />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                            <Step number="1" title="Você ativa" desc="o modo ao vivo" delay={0.2} />
                            <Step number="2" title="Fãs enviam" desc="pedidos organizados" delay={0.6} />
                            <Step number="3" title="Pix confirma" desc="automaticamente" delay={1.0} />
                            <Step number="4" title="Você toca" desc="o que quiser" delay={1.4} />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 5. COMPARISON SECTION */}
            <Section className="bg-black">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                <h3 className="text-2xl font-bold mb-6 text-white/40 flex items-center gap-2">
                                    <XCircle className="text-white/20" /> Sem Toca Aí
                                </h3>
                                <ul className="space-y-4 text-white/50">
                                    <li className="flex items-center gap-3"><span className="text-white/20">✖</span> Pedidos na base do grito</li>
                                    <li className="flex items-center gap-3"><span className="text-white/20">✖</span> Nenhuma renda extra</li>
                                    <li className="flex items-center gap-3"><span className="text-white/20">✖</span> Fã frustrado</li>
                                    <li className="flex items-center gap-3"><span className="text-white/20">✖</span> Confusão no palco</li>
                                </ul>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-accent to-pink-600 shadow-2xl shadow-accent/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                    <CheckCircle2 /> Com Toca Aí
                                </h3>
                                <ul className="space-y-4 text-white font-medium">
                                    <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✓</span> Pedidos organizados</li>
                                    <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✓</span> Pix em tempo real</li>
                                    <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✓</span> Fã participando</li>
                                    <li className="flex items-center gap-3"><span className="bg-white/20 p-1 rounded-full text-xs">✓</span> Controle total</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* 6. FAN CONNECTION */}
            <Section className="bg-gradient-to-b from-gray-900 to-black">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Heart className="w-16 h-16 text-accent mx-auto mb-6 opacity-80" />
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                            O fã não só escuta. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">Ele participa.</span>
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed mb-8">
                            "Quando o fã manda um recado e vê o artista reagir, cria-se um vínculo. <br />
                            Isso vira memória. Isso vira retorno."
                        </p>
                        <Badge variant="default" className="text-sm px-6 py-2 border-accent/30 text-accent bg-accent/5">
                            É diferente de só tocar música. É interação real.
                        </Badge>
                    </motion.div>
                </Container>
            </Section>

            {/* 7. SOCIAL PROOF & FINAL CTA */}
            <Section>
                <Container>
                    <div className="text-center mb-20">
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <ProofTag text="🎶 Artistas independentes e bandas" />
                            <ProofTag text="🎤 Bares, eventos e shows" />
                            <ProofTag text="📲 Pensado para palco" />
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto text-center bg-white/5 rounded-[2.5rem] p-7 sm:p-10 md:p-20 border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />

                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-7 md:mb-8 relative z-10">
                            Leva menos de 2 minutos <br /> para começar.
                        </h2>

                        <div className="flex flex-col items-center gap-6 relative z-10">
                            <Link href="/login?type=artist" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto max-w-sm shadow-[0_0_50px_-10px_rgba(225,29,72,0.6)] hover:shadow-[0_0_70px_-10px_rgba(225,29,72,0.8)] transition-shadow">
                                    Quero usar no meu próximo show
                                </Button>
                            </Link>
                            <p className="text-white/50">
                                Ative quando quiser. Desative quando quiser.
                            </p>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            <Footer />
        </div>
    );
}

// Sub-components
function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode, title: string, description: string, gradient?: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-8 rounded-[2rem] bg-gradient-to-br ${gradient || 'from-white/5 to-white/0'} border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden shadow-2xl`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="mb-6 p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-md relative z-10">
                {icon}
            </div>

            <h3 className="text-xl font-bold mb-3 text-white relative z-10">{title}</h3>
            <p className="text-white/70 relative z-10 font-medium leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

function ControlItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="min-w-6 min-h-6 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs text-bold">✓</div>
            <span className="text-xl text-white/90">{text}</span>
        </div>
    );
}

function Step({ number, title, desc, delay = 0 }: { number: string, title: string, desc: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, type: "spring", bounce: 0.5 }}
            className="relative text-center z-10 group"
        >
            {/* Speaker Visual */}
            <div className="w-24 h-24 rounded-full bg-[#111] border-4 border-[#222] flex items-center justify-center mx-auto mb-6 shadow-2xl relative overflow-hidden transition-transform group-hover:scale-105 duration-300">
                {/* Visual Pulse when active */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.5, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.5, duration: 0.5 }}
                    className="absolute inset-0 bg-accent/30 rounded-full"
                />

                {/* Speaker Cone Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#333_0%,_#000_70%)] opacity-80" />

                {/* Dust Cap (Center) */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#333] to-black border border-white/10 relative z-10 shadow-lg" />

                {/* Number Overlay */}
                <div className="absolute bottom-1 right-8 text-xs font-bold text-white/30 z-20">
                    {number}
                </div>
            </div>

            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-white/50 text-sm">{desc}</p>
        </motion.div>
    );
}

function ProofTag({ text }: { text: string }) {
    return (
        <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
            {text}
        </span>
    );
}
