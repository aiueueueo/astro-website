/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['BIZ UDPGothic', 'Hiragino Sans', 'Yu Gothic', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}