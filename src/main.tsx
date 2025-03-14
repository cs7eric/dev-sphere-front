import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import React from 'react'
import './index.css'
import router from './router'
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import '@/assets/font/font.css'
import {HeroUIProvider} from "@heroui/react";
import {Toaster} from "@/components/ui/toaster.tsx";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      {/* ToastProvider 必须包裹 children */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}/>
        <Toaster/>
        <App/>
      </ThemeProvider>

    </HeroUIProvider>
  </React.StrictMode>
  ,
)


