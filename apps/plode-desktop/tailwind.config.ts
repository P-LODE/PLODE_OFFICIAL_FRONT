import path from 'path'
import type { Config } from 'tailwindcss'

const sharedConfig = require('../../packages/core/tailwind.config.ts')

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    path.join(__dirname, '../../packages/core/**/*.{ts,tsx}'),
  ],
  presets: [sharedConfig],
}

export default config
