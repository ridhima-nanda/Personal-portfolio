/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        base: '#0C0C0C',
        surface: '#111111',
        card: '#141414',
        border: {
          subtle: '#242424',
        },
        chrome: {
          from: '#646973',
          to: '#BBCCD7',
        },
        accent: {
          purple: '#8B5CF6',
          magenta: '#D946EF',
          orange: '#F97316',
        },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}

