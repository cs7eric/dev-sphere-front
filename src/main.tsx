import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import React from 'react'
import './index.css'
import router from './router'
import {HeroUIProvider} from "@heroui/system";
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <HeroUIProvider>
        <RouterProvider router={router}>
          <App/>

        </RouterProvider>
      </HeroUIProvider>
    </ThemeProvider>
  </React.StrictMode>,
)


