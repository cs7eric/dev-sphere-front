import './App.css'

import {Button} from "@/components/ui/button.tsx";
import {useState, lazy, Suspense} from "react";

// 懒加载3D渲染组件
const Lanyard = lazy(() => import('@/components/reactbits/Lanyard'));

function App() {

  const [showLanyard, setShowLanyard] = useState(false)

  return (
    <>
      <Button onClick={() => {
        setShowLanyard(true)
      }}>Login</Button>
      {showLanyard && (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]}/>
        </Suspense>
      )}

    </>
  )
}

export default App
