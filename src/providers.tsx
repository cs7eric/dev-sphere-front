// app/providers.tsx

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import {AnimatePresence} from "framer-motion";

export default function Providers({ children }) {
  return (


        {children}

  )
}