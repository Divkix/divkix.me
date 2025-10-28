"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Float } from "@react-three/drei"

export function TorusKnotWithShader() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color1: { value: new THREE.Color("#6366f1") }, // indigo
      u_color2: { value: new THREE.Color("#8b5cf6") }, // violet
      u_color3: { value: new THREE.Color("#d946ef") }, // fuchsia
    }),
    []
  )

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      // Create gradient based on UV and normal
      float gradient = vUv.y + dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5;

      // Animate gradient with time
      float offset = sin(u_time * 0.5) * 0.5 + 0.5;
      gradient = mod(gradient + offset, 1.0);

      // Mix three colors
      vec3 color;
      if (gradient < 0.5) {
        color = mix(u_color1, u_color2, gradient * 2.0);
      } else {
        color = mix(u_color2, u_color3, (gradient - 0.5) * 2.0);
      }

      // Add rim lighting
      float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
      rim = pow(rim, 3.0);
      color += rim * 0.3;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = state.clock.elapsedTime

      // Slow rotation
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}
