// tailwind.config.ts

import { heroui } from "@heroui/react";
import type { Config } from 'tailwindcss'; // 引入 Config 类型
const config: Config = {

  content: [
    // 你的项目文件路径...
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{jx,ts,tsx,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],

  darkMode: "class",
  plugins: [heroui()],
  mode: 'jit'
};

export default config;