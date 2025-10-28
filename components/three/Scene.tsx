"use client";

import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense } from "react";

interface SceneProps {
  children: ReactNode;
  className?: string;
}

export function Scene({ children, className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
