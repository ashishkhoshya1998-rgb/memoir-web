export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FAFAF7', 200: '#F5F0E8', 300: '#EDE5D8' },
        gold: { DEFAULT: '#B8975A', light: '#D4B483', dark: '#9A7A3E' },
        charcoal: { DEFAULT: '#1C1C1A', light: '#3A3A38', muted: '#6B6560', soft: '#9A9592' },
        blush: '#F0E8E0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
