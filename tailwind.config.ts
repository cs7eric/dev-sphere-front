// tailwind.config.ts
import type {Config} from 'tailwindcss';
import {heroui} from '@heroui/react';

const config: { Config , plugins: never[]; theme: { extend: object }; darkMode: string; content: string[] } = {
  content: [
    // 你的项目文件路径...
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{jx,ts,tsx,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem'
      },
      fontFamily: {
        emblema: ['emblemaone', 'sans-serif'],
        'nova-flat': '"Nova Flat"'
      },
      spacing: {
        'nav-height': 'var(--nav-height)'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
};

export default config;