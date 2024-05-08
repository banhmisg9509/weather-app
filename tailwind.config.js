/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-1': 'var(--background-1)',
        'background-2': 'var(--background-2)',
        'background-3': 'var(--background-3)',
        'background-4': 'var(--background-4)',
        'background-5': 'var(--background-5)',
        'text-1': 'var(--text-1)'
      }
    }
  },
  plugins: []
}
