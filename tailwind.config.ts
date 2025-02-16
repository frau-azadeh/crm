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
        primary: '#2563EB', // آبی اصلی
        secondary: '#1E293B', // طوسی تیره
        accent: '#FACC15', // زرد تاکیدی
        background: '#F8FAFC', // پس‌زمینه روشن
        textPrimary: '#1E293B', // متن اصلی
        textSecondary: '#64748B', // متن فرعی
      },
    },
  },
  plugins: [],
} satisfies Config;
