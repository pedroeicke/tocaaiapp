// Framer Motion Animation Presets
// Apple-style easing and timing

import { Variants } from 'framer-motion';

// ========== EASING ==========
export const easeApple = [0.4, 0.0, 0.2, 1] as const;

// ========== DURATIONS ==========
export const duration = {
    fast: 0.18,
    normal: 0.25,
    slow: 0.35,
    fadeSlide: 0.6,
    hero: 0.85,
} as const;

// ========== STAGGER ==========
export const stagger = {
    fast: 0.08,
    normal: 0.10,
    slow: 0.12,
} as const;

// ========== VARIANTS ==========

// Section entrance (standard)
export const sectionEnter: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easeApple,
        },
    },
};

// Hero entrance (cascading)
export const heroEnter = {
    headline: {
        hidden: { opacity: 0, y: 22 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                delay: 0.05,
                ease: easeApple,
            },
        },
    },
    subheadline: {
        hidden: { opacity: 0, y: 22 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                delay: 0.18,
                ease: easeApple,
            },
        },
    },
    cta: {
        hidden: { opacity: 0, y: 22 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                delay: 0.30,
                ease: easeApple,
            },
        },
    },
    input: {
        hidden: { opacity: 0, y: 22 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                delay: 0.40,
                ease: easeApple,
            },
        },
    },
} as const;

// Card hover
export const cardHover = {
    rest: {
        y: 0,
        scale: 1,
    },
    hover: {
        y: -2,
        scale: 1.01,
        transition: {
            duration: 0.20,
            ease: easeApple,
        },
    },
} as const;

// Modal animations
export const modalBackdrop: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: easeApple,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: easeApple,
        },
    },
};

export const modalContainer: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: easeApple,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.2,
            ease: easeApple,
        },
    },
};

// Accordion height animation
export const accordionContent: Variants = {
    collapsed: {
        height: 0,
        opacity: 0,
    },
    expanded: {
        height: 'auto',
        opacity: 1,
        transition: {
            height: {
                duration: 0.25,
                ease: easeApple,
            },
            opacity: {
                duration: 0.2,
                delay: 0.05,
                ease: easeApple,
            },
        },
    },
};

// Fade in/out
export const fadeInOut: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: easeApple,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: easeApple,
        },
    },
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.normal,
        },
    },
};

// Stagger item
export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easeApple,
        },
    },
};

// Success checkmark animation
export const checkmarkAnimation: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: easeApple,
        },
    },
};
