/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f2',
          100: '#fff0e6',
          200: '#ffdfcc',
          300: '#ffceb3',
          400: '#ffbd99',
          500: '#ff9966',
          600: '#ff7733',
          700: '#ff5500',
          800: '#e64d00',
          900: '#cc4400',
        },
        secondary: {
          100: '#ffebeb',
          200: '#ffd6d6',
          300: '#ffc2c2',
          400: '#ffadad',
          500: '#ff9999',
          600: '#ff7575',
          700: '#ff5252',
          800: '#ff2e2e',
          900: '#ff0a0a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #ff5500, #e60073)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 1.5s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 