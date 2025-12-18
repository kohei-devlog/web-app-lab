/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* shadcn / Tailwind v4 トークン互換用 */
        background: "#ffffff",
        foreground: "#111827",

        border: "#d1d5db",
        ring: "#d1d5db",

        accent: "#f3f4f6",
        "accent-foreground": "#111827",

        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
          border: "#e5e7eb",
          accent: "#f3f4f6",
          "accent-foreground": "#111827",
        },
      },
    },
  },
  plugins: [],
}
