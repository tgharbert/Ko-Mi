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
        primary: '#1A1A1A',
        secondary: '#D64045',
        tertiary: '#FFF8F0',
        accent: '#F4A127',
        'accent-hover': '#D88B1A',
        pop: '#2274A5',
        card: '#555555',
      },
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'check-strike': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'fade-out': 'fade-out 150ms ease-in',
        'slide-up': 'slide-up 300ms ease-out',
        'toast-in': 'toast-in 300ms ease-out',
        'check-strike': 'check-strike 200ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
