// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
       boxShadow: {
      'inner-custom': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)'
    },
      colors: {
        customYellow: '#FFF6B0',
      },
      fontFamily: {
        italiana: ['Italiana', 'serif'], 
        irish: ['Irish Grover', 'cursive'],
      }
    },
  },
  plugins: [],
}

