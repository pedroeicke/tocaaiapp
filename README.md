# Toca Aí

Premium music request platform with real-time Pix payments and artist dashboard. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Public Pages**: Apple Music-inspired landing page with 7 sections
- **Artist Pages**: Dynamic artist pages with live event status
- **Real-time Requests**: Instant request updates via Supabase Realtime
- **Pix Integration**: Payment confirmation via edge function
- **Artist Dashboard**: Event management and live queue
- **Premium Design**: SF Pro fonts, custom gradients, smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase project with required schema

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── page.tsx           # Homepage (7 sections)
│   ├── buscar/            # Artist search
│   ├── [slug]/            # Dynamic artist page
│   ├── login/             # Authentication
│   ├── signup/
│   ├── me/                # User profile
│   └── artist/            # Artist dashboard & live queue
├── components/            # React components
│   ├── ui/                # Base UI components
│   └── layout/            # Layout components
├── lib/                   # Utilities
│   ├── supabase/          # Supabase clients & types
│   ├── design-tokens.ts   # Design system constants
│   ├── animations.ts      # Framer Motion presets
│   └── utils.ts           # Helper functions
└── hooks/                 # Custom React hooks
```

## Design System

### Colors
- Primary Red: `#FA233B`
- Background: White `#FFFFFF`
- Text: `#1D1D1F`

### Gradients
- **G1 Hero**: `linear-gradient(135deg, #FA233B 0%, #FF4A6E 40%, #FF7A59 100%)`
- **G2 Section**: Subtle warmth overlay
- **G3 CTA**: Horizontal gradient for CTAs
- **G4 Backdrop**: Radial gradients for soft backgrounds

### Typography
- Font: SF Pro Display / SF Pro Text (with fallbacks)
- Hero: 72px desktop / 44px mobile
- Headline: 40px desktop / 32px mobile

### Animations
- Easing: `cubic-bezier(0.4, 0.0, 0.2, 1)` (easeApple)
- Hero cascade: Staggered entrance with 0.05s-0.40s delays
- Card hover: y: -2px, scale: 1.01
- Scroll reveals: 25% viewport threshold

## Backend Integration

This frontend strictly consumes an existing Supabase backend:

### Tables
- `profiles`: User data
- `artists`: Artist/band information
- `events`: Event status (LIVE/ENDED/SCHEDULED)
- `requests`: Song/message requests
- `payments`: Pix payment tracking

### Edge Function
- `criar-mensagem-musico`: Creates request and returns Pix QR code

### Real-time
- Subscribes to `requests` table changes by `event_id`
- Auto-closes Pix modal on payment confirmation

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any Next.js-compatible platform.

## License

All rights reserved.
