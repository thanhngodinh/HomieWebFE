/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        header: 'var(--color-bg-header)',
        purple: 'var(--color-bg-purple)',
        white: 'var(--color-bg-white)',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        purple: 'var(--color-text-purple)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};