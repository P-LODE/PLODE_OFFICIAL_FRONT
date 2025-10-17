import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
    './features/**/*.{ts,tsx}',
    './auth/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
    },
    plugins: [],
    mode: 'jit',
  },
}

export default config
