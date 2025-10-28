"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: "box" | "sphere" | "torus" | "octahedron";
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;

    // Floating animation - REDUCED amplitude and frequency
    meshRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.15;

    // Rotation - DRASTICALLY slowed down with damping
    meshRef.current.rotation.x += delta * 0.05 * speed;
    meshRef.current.rotation.y += delta * 0.03 * speed;
    meshRef.current.rotation.z += delta * 0.02 * speed;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[0.4, 0.2, 16, 100]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

export function FloatingShapes() {
  const shapes = [
    {
      position: [-3, 2, -2] as [number, number, number],
      geometry: "box" as const,
      color: "#3b82f6",
      speed: 0.5,
    },
    {
      position: [3, -1, -3] as [number, number, number],
      geometry: "sphere" as const,
      color: "#8b5cf6",
      speed: 0.7,
    },
    {
      position: [2, 3, -1] as [number, number, number],
      geometry: "torus" as const,
      color: "#ec4899",
      speed: 0.6,
    },
    {
      position: [-2, -2, -2] as [number, number, number],
      geometry: "octahedron" as const,
      color: "#06b6d4",
      speed: 0.55,
    },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
}
