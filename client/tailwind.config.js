/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    colors: {
      'green-100': '#D9ED92',
      'green-200': '#A8DB93',
      'green-300': '#76C893',
      'blue-100': '#52b69a',
      'blue-200': '#34A0A4',
      'blue-300': '#0E2C44',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
  },
}
export const plugins = []
export const safelist = [
  {
    pattern: /bg-(yellow|emerald|violet|red|sky|pink|blue)-(200|300|400)/,
  },
]
