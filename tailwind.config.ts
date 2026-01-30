import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1D1D1F",
                    light: "#6E6E73",
                },
                accent: {
                    DEFAULT: "#FA233B",
                    hover: "#E81B31",
                },
                border: "rgba(0, 0, 0, 0.08)",
            },
            fontFamily: {
                display: [
                    "SF Pro Display",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif",
                ],
                sans: [
                    "SF Pro Text",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif",
                ],
            },
            spacing: {
                section: "96px",
                "section-mobile": "64px",
            },
            borderRadius: {
                card: "24px",
                pill: "999px",
            },
            backgroundImage: {
                "gradient-hero": "linear-gradient(135deg, #FA233B 0%, #FF4A6E 40%, #FF7A59 100%)",
                "gradient-section": "linear-gradient(180deg, rgba(250,35,59,0.10) 0%, rgba(255,255,255,0.0) 70%)",
                "gradient-cta": "linear-gradient(90deg, #FA233B 0%, #FF4A6E 45%, #FF7A59 100%)",
                "gradient-backdrop": `radial-gradient(800px 400px at 20% 20%, rgba(250,35,59,0.12) 0%, rgba(255,255,255,0) 60%),
                              radial-gradient(700px 380px at 80% 30%, rgba(255,122,89,0.10) 0%, rgba(255,255,255,0) 55%)`,
            },
            transitionTimingFunction: {
                apple: "cubic-bezier(0.4, 0.0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};

export default config;
