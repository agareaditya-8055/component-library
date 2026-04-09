import type { Config } from 'tailwindcss';
import preset from './tailwind.preset';

const config: Config = {
  presets: [preset],
  content: ['./packages/**/*.{ts,tsx}']
};

export default config;
