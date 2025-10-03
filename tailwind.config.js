/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#41743B',
          'gray-light': '#BFC3C5',
          'off-white': '#F3F2F5',
          'white-light': '#F7F7F8',
          'dark-gray': '#464C50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
