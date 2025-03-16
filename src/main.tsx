import {createRoot} from 'react-dom/client'
import React from 'react'
import './index.css'
import '@/assets/font/font.css'

import Providers from "@/providers.tsx";

createRoot(document.getElementById('root')).render(
  <Providers/>
)


