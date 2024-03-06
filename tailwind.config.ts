import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // primary: '#D7FEE8',
        primary: '#233329',
        secondary: '#ABFF4F',
        tertiary: '#F7F9F9',
        'default-text': '#F7F9F9',
      },
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
        'nunito':  ['nunito', 'sans-serif'],
        'proxima': ['Proxima Nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
