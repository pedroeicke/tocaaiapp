'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/Accordion';
import { SearchInput } from '@/components/SearchInput';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientCard } from '@/components/ui/GradientCard';
import { heroEnter, staggerContainer, staggerItem } from '@/lib/animations';
// @ts-ignore
import { Zap, UserCircle2, Radio, Music2, Heart } from 'lucide-react'; // Icons

export default function HomePage() {
    const router = useRouter();

    const handleSearch = (slug: string) => {
        router.push(`/${slug}`);
    };

    const faqItems = [
        {
            question: 'Preciso criar uma conta para pedir uma música?',
            answer: 'Não! Você pode enviar pedidos como visitante, informando apenas seu nome.',
        },
        {
            question: 'Como funciona o pagamento com Pix?',
            answer: 'Após escrever seu pedido, você escolhe o valor e recebe um QR Code. O pagamento é confirmado automaticamente em segundos.',
        },
        {
            question: 'Quando meu pedido aparece para o artista?',
            answer: 'Após a confirmação do pagamento (ou imediatamente se for grátis), seu pedido aparece em tempo real na tela do artista.',
        },
        {
            question: 'Posso enviar pedido grátis?',
            answer: 'Depende do artista. Alguns aceitam pedidos gratuitos, outros definem um valor mínimo.',
        },
        {
            question: 'O que significa "LIVE"?',
            answer: 'O artista está ao vivo e aceitando pedidos neste momento!',
        },
    ];

    return (
        <>
            {/* SECTION 1: HERO */}
            <section className="relative min-h-[100svh] md:min-h-[92vh] flex items-center overflow-hidden">
                {/* Hero Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/herovideo.mp4" type="video/mp4" />
                    </video>
                    {/* Dark gradient overlay for text readability - Stronger gradient */}
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                <Container className="relative z-10 pt-[calc(env(safe-area-inset-top)+7rem)] sm:pt-[calc(env(safe-area-inset-top)+7.5rem)] md:pt-0 pb-6 md:pb-0">
                    <div className="max-w-5xl mx-auto text-center text-white">
                        <motion.h1
                            variants={heroEnter.headline}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-3 tracking-tight"
                        >
                            Apareça no show.
                        </motion.h1>

                        <motion.p
                            variants={heroEnter.subheadline}
                            initial="hidden"
                            animate="visible"
                            className="text-base sm:text-lg md:text-xl mb-6 opacity-95"
                        >
                            Peça uma música ou mande um recado. O artista recebe em tempo real.
                        </motion.p>

                        <motion.div
                            variants={heroEnter.cta}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6"
                        >
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() => router.push('/buscar')}
                                className="w-full sm:w-auto"
                            >
                                Pedir agora
                            </Button>
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => router.push('/buscar')}
                                className="w-full sm:w-auto"
                            >
                                Apoiar artista
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={heroEnter.input}
                            initial="hidden"
                            animate="visible"
                            className="max-w-md mx-auto"
                        >
                            <SearchInput
                                onSearch={handleSearch}
                                placeholder="Digite o nome da banda"
                                buttonText="Entrar"
                            />
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* SECTION 2: BENEFITS */}
            <Section gradient="section">
                <Container>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <motion.div variants={staggerItem}>
                            <GradientCard
                                icon={Zap}
                                title="Pix instantâneo"
                                description="Pagamento confirmado em segundos. Sem espera, direto pra tela."
                                className="h-full"
                            />
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <GradientCard
                                icon={UserCircle2}
                                title="Sem cadastro"
                                description="Envie pedidos direto como visitante. Rapidez total."
                                className="h-full from-[#9B51E0] to-[#3081ED]" // Custom gradient for variety
                            />
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <GradientCard
                                icon={Radio} // Using Radio icon for "Live"
                                title="Ao vivo"
                                description="Seu pedido chega na hora, piscando na tela do banco."
                                className="h-full from-[#FF2D55] to-[#FF375F] bg-gradient-to-br" // Apple Pink
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </Section>

            {/* SECTION 3: VISUAL BLOCK ("O Palco te Escuta") */}
            <Section>
                <Container>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[2.4/1] rounded-card group"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] to-[#FF0000] rounded-card opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700" />

                        {/* Gradient Border */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF9900] to-[#FF0000] rounded-card" />

                        {/* Content Container */}
                        <div className="relative h-full w-full rounded-card overflow-hidden bg-zinc-900">
                            {/* Background Image */}
                            <Image
                                src="/palcoescuta.jpg"
                                alt="O palco te escuta"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 sm:p-8 md:p-12 text-center pb-10 sm:pb-14 md:pb-16">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-3 md:mb-4 tracking-tight text-white drop-shadow-2xl">
                                    O palco te escuta.
                                </h2>
                                <p className="text-base sm:text-lg md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-lg">
                                    Sua mensagem chega direto para o artista. Seja no meio da festa ou de casa, você faz parte do show.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* SECTION 4: HOW IT WORKS */}
            <Section gradient="section">
                <Container>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
                    >
                        Como funciona
                    </motion.h2>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Audio Track Connecting Line - Waveform Effect */}
                        {/* Audio Track Connecting Line - Waveform Effect */}
                        <div className="hidden md:block absolute top-[2rem] left-[15%] right-[15%] h-[32px] -translate-y-1/2 z-0 opacity-80 overflow-hidden">
                            <motion.div
                                className="w-full h-full"
                                animate={{ backgroundPositionX: ["-60px", "0px"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='32' viewBox='0 0 60 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L3 10 L6 22 L9 8 L12 24 L15 12 L18 20 L21 6 L24 26 L27 14 L30 18 L33 4 L36 28 L39 10 L42 22 L45 8 L48 24 L51 14 L54 18 L57 6 L60 16' stroke='%23FA233B' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'repeat-x',
                                    backgroundPosition: '0 center',
                                    backgroundSize: 'auto 100%'
                                }}
                            />
                            {/* Fade mask for edges */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                        </div>

                        {[
                            { number: '1', title: 'Encontre a banda', description: 'Busque pelo nome do artista/banda' },
                            { number: '2', title: 'Escreva o pedido', description: 'Mensagem ou pedido de música' },
                            { number: '3', title: 'Apoie e apareça', description: 'Pague com Pix e aparece no show' },
                        ].map((step, index) => (
                            <motion.div key={index} variants={staggerItem} className="relative z-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white text-2xl font-display font-bold mb-4 shadow-[0_0_20px_rgba(250,35,59,0.3)]">
                                    {step.number}
                                </div>
                                <h3 className="font-display text-xl font-semibold mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-white/60">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {/* SECTION 5: TWO PATHS */}
            <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GradientCard
                            icon={Music2}
                            title="Estou no show"
                            description="Mande sua mensagem ao vivo no telão!"
                            className="p-8 from-[#2E90FA] to-[#003CFF] min-h-[240px] md:min-h-[300px]" // Blue Theme
                            onClick={() => router.push('/buscar')}
                        >
                            <Button
                                variant="secondary" // White glass button looks great on blue
                                size="lg"
                                className="mt-8 w-full"
                            >
                                Entrar no show
                            </Button>
                        </GradientCard>

                        <GradientCard
                            icon={Heart}
                            title="Apoiar de casa"
                            description="Não pode ir? Apoie seu artista de longe."
                            className="p-8 from-[#7F56D9] to-[#42307D] min-h-[240px] md:min-h-[300px]" // Purple Theme
                            onClick={() => router.push('/buscar')}
                        >
                            <Button
                                variant="secondary"
                                size="lg"
                                className="mt-8 w-full"
                            >
                                Apoiar agora
                            </Button>
                        </GradientCard>
                    </div>
                </Container>
            </Section>

            {/* SECTION 6: FOR ARTISTS - BANNER STYLE */}
            <section className="relative w-full py-16 md:py-24 my-8 md:my-12 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/musiconopalco.jpg"
                        alt="Background Palco"
                        fill
                        className="object-cover object-[75%_center] sm:object-center"
                    />
                    <div className="absolute inset-0 bg-black/55 md:bg-black/65" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <Container className="relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-5 md:mb-6 tracking-tight leading-tight">
                                Para artistas:<br />
                                ative o modo ao vivo.
                            </h2>
                            <ul className="text-base md:text-lg text-white/70 mb-7 md:mb-8 space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Fila de pedidos em tempo real
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Confirmação de Pix automática
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Controle de valor mínimo
                                </li>
                            </ul>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => router.push('/souartista')}
                                className="px-8 w-full sm:w-auto"
                            >
                                Saiba mais
                            </Button>
                        </div>
                        {/* Right side left empty for visual balance with background image */}
                        <div className="hidden lg:block" />
                    </div>
                </Container>
            </section>

            {/* SECTION 7: FAQ */}
            <Section>
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                            Perguntas frequentes
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((item, index) => (
                                <div key={index} className="glass-card rounded-2xl p-6">
                                    <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                                    <p className="text-white/60">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </>
    );
}
