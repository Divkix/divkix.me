"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotation - DRASTICALLY slowed down
    meshRef.current.rotation.x += delta * 0.04;
    meshRef.current.rotation.y += delta * 0.06;

    // Pulsating scale - MUCH slower and subtler
    const scale = 1 + Math.sin(time * 0.4) * 0.03;
    meshRef.current.scale.set(scale, scale, scale);

    // Color morphing - SLOWED DOWN significantly
    const hue = (time * 0.02) % 1;
    const color = new THREE.Color().setHSL(hue, 0.7, 0.5);
    materialRef.current.color = color;
    materialRef.current.emissive = color;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}
