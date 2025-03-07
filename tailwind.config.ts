// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: { plugins: never[]; theme: { extend: object }; darkMode: string; content: string[] } = {
  content: [
    // 你的项目文件路径...
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()]
};

export default config;