import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          white: 'rgba(255, 255, 255, 0.75)',
          'white-high': 'rgba(255, 255, 255, 0.88)',
          'white-medium': 'rgba(255, 255, 255, 0.65)',
          'white-low': 'rgba(255, 255, 255, 0.45)',
          blue: 'rgba(230, 242, 255, 0.8)',
          'blue-light': 'rgba(204, 229, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.4)',
          'border-hover': 'rgba(0, 153, 216, 0.6)',
        },
      },
      backdropBlur: {
        'glass-xs': '8px',
        'glass-sm': '12px',
        'glass': '20px',
        'glass-md': '24px',
        'glass-lg': '28px',
        'glass-xl': '36px',
      },
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(0, 102, 204, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
        'glass': '0 8px 32px rgba(0, 102, 204, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.7)',
        'glass-md': '0 12px 40px rgba(0, 102, 204, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.7)',
        'glass-lg': '0 16px 48px rgba(0, 102, 204, 0.14), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
        'glass-xl': '0 20px 60px rgba(0, 102, 204, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
      },
      animation: {
        'sweep-down': 'sweepDown 0.6s ease-out',
        'sweep-diagonal': 'sweepDiagonal 0.7s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        sweepDown: {
          '0%': { top: '-100%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        sweepDiagonal: {
          '0%': { transform: 'translate(-100%, -100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translate(100%, 100%)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -40px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;