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
    },
  },
  plugins: [],
};
export default config;
