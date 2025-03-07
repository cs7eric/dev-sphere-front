import './App.css'

import Lanyard from '@/components/reactbits/Lanyard'
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {ThemeProvider} from "@/components/theme-provider.tsx";

function App() {

  const [showLanyard, setShowLanyard] = useState(false)

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button onClick={() => {
          setShowLanyard(true)
        }}>Login</Button>
        {showLanyard && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]}/>}

      </ThemeProvider>
      </>
      )
      }
      export default App
