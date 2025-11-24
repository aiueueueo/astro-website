/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // レトロなカラーパレット
        retro: {
          bg: '#222222',    // 温かみのあるダークグレー (旧: #252526)
          green: '#477A72', // くすんだ青緑
          red: '#9E3E3E',   // くすんだ赤
          text: '#EAE0D5',  // 明るめのクリームベージュ (旧: #D6C6AD)
          // ホバー用などに少し明る/暗いバリエーション
          'green-hover': '#568f86',
          'red-hover': '#b54d4d',
        }
      },
      fontFamily: {
        sans: ['BIZ UDPGothic', 'Hiragino Sans', 'Yu Gothic', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}