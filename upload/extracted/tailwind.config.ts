import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAF9F6",
          card: "#FFFFFF",
          primary: "#1C1917",
          secondary: "#78716C",
          accent: "#D97706",
          gold: "#F59E0B",
          border: "#E7E5E4",
          hover: "#F5F5F4",
        },
        cinematic: {
          50: "#FDF8F5",
          100: "#FAF0E9",
          200: "#F3DDCE",
          300: "#E8C0A5",
          400: "#D99A6E",
          500: "#CC7A42",
          600: "#B8612C",
          700: "#9A4C22",
          800: "#7E3F20",
          900: "#6A361F",
          950: "#3B1C0E",
        },
        ink: {
          50: "#F5F5F4",
          100: "#E7E5E4",
          200: "#D6D3D1",
          300: "#A8A29E",
          400: "#78716C",
          500: "#57534E",
          600: "#44403C",
          700: "#363230",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
      },
      fontFamily: {
        amiri: ["Amiri", "serif"],
        tajawal: ["Tajawal", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out infinite 3s",
        "shimmer": "shimmer 2s infinite",
        "reveal-up": "revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-scale": "revealScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "word-in": "wordIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 20s linear infinite",
        "bounce-gentle": "bounceGentle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        wordIn: {
          "0%": { opacity: "0", transform: "translateY(100%) rotateX(-40deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotateX(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-cinema": "linear-gradient(135deg, #FAF9F6 0%, #F5F0EB 50%, #FAF9F6 100%)",
        "gradient-warm": "linear-gradient(135deg, #D97706, #F59E0B, #78716C)",
        "gradient-gold": "linear-gradient(135deg, #F59E0B, #D97706)",
        "gradient-text": "linear-gradient(135deg, #1C1917 0%, #57534E 100%)",
      },
      boxShadow: {
        "warm": "0 0 30px rgba(217, 119, 6, 0.12), 0 0 60px rgba(217, 119, 6, 0.06)",
        "glow": "0 0 40px rgba(217, 119, 6, 0.08)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 32px rgba(217, 119, 6, 0.08)",
        "elevated": "0 20px 60px rgba(0, 0, 0, 0.12)",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
