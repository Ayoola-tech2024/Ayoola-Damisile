/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './main.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#08080a',
        darkCard: '#101014'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      }
    }
  }
};
