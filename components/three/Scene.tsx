"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"

interface SceneProps {
  children: React.ReactNode
}

export function Scene({ children }: SceneProps) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setMounted(true)

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-foreground/30">Loading 3D Scene...</div>
      </div>
    )
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="w-full h-full"
      frameloop={isVisible ? "always" : "never"}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  )
}
