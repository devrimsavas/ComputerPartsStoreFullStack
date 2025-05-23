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
        primary: { DEFAULT: `hsl(var(--primary))` },
        secondary: { DEFAULT: `hsl(var(--secondary))` },
        background: {
          DEFAULT: `hsl(var(--background))`,
          light: `hsl(var(--accent-1))`,
          dark: `hsl(var(--accent-2))`,
        },
      },
    },
  },
  plugins: [],
};
export default config;
