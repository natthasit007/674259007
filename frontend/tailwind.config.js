/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tropical: {
          50: '#F2F9FD',
          100: '#E4F3FA',
          200: '#C0E4F6', // Tropical Blue Base
          300: '#99D2F0',
          400: '#61BBE5',
          500: '#2696CF',
          600: '#177AB0',
          700: '#14628E',
          800: '#155276',
          900: '#164562',
          950: '#0e2d42',
        }
      },
      fontFamily: {
        sans: ['Sarabun', 'TH Sarabun New', 'Prompt', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
