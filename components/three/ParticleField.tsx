"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 1000 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate random particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count]);

  // Setup mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const particle = particles[i];

      // Base position with wave motion
      const waveX = Math.sin(time * 0.5 + particle.x) * 0.1;
      const waveY = Math.cos(time * 0.5 + particle.y) * 0.1;

      // Mouse interaction
      const mouseInfluence = 0.5;
      const mouseX = mouseRef.current.x * mouseInfluence;
      const mouseY = mouseRef.current.y * mouseInfluence;

      dummy.position.set(
        particle.x + waveX + mouseX,
        particle.y + waveY + mouseY,
        particle.z
      );

      // Slow rotation
      dummy.rotation.x = time * 0.2 + particle.x;
      dummy.rotation.y = time * 0.2 + particle.y;

      // Random scale for depth
      const scale = 0.05 + Math.random() * 0.05;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}
