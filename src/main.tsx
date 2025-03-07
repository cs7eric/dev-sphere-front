import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import router from './router'
import {HeroUIProvider} from "@heroui/system";
import App from "@/App.tsx";


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} >
        <App />

      </RouterProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)


