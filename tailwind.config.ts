// tailwind.config.ts
import {heroui} from '@heroui/react';

const config: { Config , plugins: never[]; theme: { extend: object }; darkMode: string; content: string[] } = {
  content: [
    // 你的项目文件路径...
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{jx,ts,tsx,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  plugins: [heroui()]
};

export default config;