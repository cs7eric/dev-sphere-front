import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import React from 'react'
import './index.css'
import router from './router'
import App from "@/App.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import '@/assets/font/font.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
  ,
)


