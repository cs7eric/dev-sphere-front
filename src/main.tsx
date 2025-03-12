import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import React from 'react'
import './index.css'
import router from './router'
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import '@/assets/font/font.css'
import Providers from "@/providers.tsx";
import {AnimatePresence} from "framer-motion";
import {ToastProvider} from "@heroui/toast";
import {HeroUIProvider} from "@heroui/react";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}>
        <HeroUIProvider
          defaultTheme="dark"
          themeStorageKey="dev-sphere"
        >
          {/* ToastProvider 必须包裹 children */}
          <AnimatePresence>
            <ToastProvider
              placement="top-right"
              toastOffset={70}
              timeout={3000}
              maxVisibleToasts={3}
              defaultVariant="solid"
              classNames={{
                base: "w-[360px] min-h-[120px] shadow-xl rounded-xl",
                wrapper: "p-4 gap-y-3",
                title: "text-lg font-semibold text-gray-900",
                description: "text-sm text-gray-600 leading-5",
                icon: "w-8 h-8 [&>svg]:w-full [&>svg]:h-full",
                closeButton: "w-10 h-10 hover:bg-gray-100 rounded-full",
                closeIcon: "w-5 h-5 text-gray-500",
                progressTrack: "h-1 bg-gray-200",
                progressIndicator: "h-1 bg-blue-500"
              }}
            >
              {/*<App/>*/}
            </ToastProvider>
          </AnimatePresence>
        </HeroUIProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
  ,
)


