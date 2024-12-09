/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'bg': 'url(/bg.png)'
    },
    extend: {
      colors: {
        orange: '#DD8017'
      },
      animation: {
        sequence1: 'sequence1 3s infinite ease-in-out',
        sequence2: 'sequence2 3s infinite ease-in-out',
        sequence3: 'sequence3 3s infinite ease-in-out',
      },
      keyframes: {
        sequence1: {
          '0%, 33%': { color: 'orange' },
          '34%, 100%': { color: 'black' },
        },
        sequence2: {
          '0%, 33%': { color: 'black' },
          '34%, 66%': { color: 'orange' },
          '67%, 100%': { color: 'black' },
        },
        sequence3: {
          '0%, 66%': { color: 'black' },
          '67%, 100%': { color: 'orange' },
        },
      },
    },
  },
  plugins: [],
}