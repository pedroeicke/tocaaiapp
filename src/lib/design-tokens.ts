// Design Tokens - Toca Aí Premium Design System
// Inspired by Apple Music BR

// ========== COLORS ==========
export const colors = {
    // Base
    background: '#000000',
    textPrimary: '#F5F5F7',
    textSecondary: '#86868B',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.4)',

    // Accents
    accent: '#FA233B', // Apple Music Red
    accentHover: '#FF3B30',

    // Ambient Glows (for background)
    glowBlue: '#2E90FA',
    glowPurple: '#9B51E0',
    glowPink: '#FF4A6E',
} as const;

// ========== GRADIENTS ==========
export const gradients = {
    // G1: Primary CTA
    cta: 'linear-gradient(90deg, #FA233B 0%, #FF4A6E 100%)',

    // G2: Subtle overlay for cards (Glass)
    glass: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',

    // G3: Dark fade for sections
    fade: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)',
} as const;

// ========== TYPOGRAPHY ==========
export const typography = {
    // Font families
    fontDisplay: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontText: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    // Font sizes
    hero: {
        desktop: '72px',
        mobile: '44px',
    },
    headline: {
        desktop: '40px',
        mobile: '32px',
    },
    subheadline: {
        desktop: '20px',
        mobile: '18px',
    },
    body: '16px',

    // Line heights
    lineHeightTight: 1.1,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.7,

    // Letter spacing
    trackingTight: '-0.02em',
    trackingNormal: '0',
} as const;

// ========== SPACING ==========
export const spacing = {
    // Section spacing
    sectionDesktop: '96px',
    sectionMobile: '64px',

    // Container
    containerMaxWidth: '1120px',
    containerPaddingDesktop: '24px',
    containerPaddingMobile: '16px',

    // Hero
    heroMinHeightDesktop: '92vh',
    heroMinHeightMobile: '80vh',
} as const;

// ========== BORDER RADIUS ==========
export const borderRadius = {
    card: '24px',
    pill: '999px',
    input: '12px',
} as const;

// ========== SHADOWS ==========
export const shadows = {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.08)',
    card: '0 4px 16px rgba(0, 0, 0, 0.08)',
    cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
} as const;

// ========== BREAKPOINTS ==========
export const breakpoints = {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
} as const;
