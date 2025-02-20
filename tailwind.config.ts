import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        textPrimary: 'hsl(var(--text-primary))',
        textSecondary: 'hsl(var(--text-secondary))',
        gray100: 'hsl(var(--gray-100))',
        blue500: 'hsl(var(--blue-500))',
        blue900: 'hsl(var(--blue-900))',
        white: 'hsl(var(--white))',
        gray600: 'hsl(var(--gray-600))',
        red600: 'hsl(var(--red-600))',
      },
    },
  },
  plugins: [],
} satisfies Config;
