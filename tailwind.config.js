/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-b0e0e6': 'rgba(126, 224, 230, 1)',
        'gradient-9cc7cd': 'rgba(156, 199, 205, 0.7)',
        'gradient-89aeb3': 'rgba(137, 174, 179, 1)',
        'gradient-759599': 'rgba(126, 224, 230, 1)',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

