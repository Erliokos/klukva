'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import styled from 'styled-components'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useGLTF } from '@react-three/drei'

// Динамический импорт Canvas
const Canvas = dynamic(
  () => import('@react-three/fiber').then(mod => mod.Canvas),
  { ssr: false }
)

const Float = dynamic(
  () => import('@react-three/drei').then(mod => mod.Float),
  { ssr: false }
)

const OrbitControls = dynamic(
  () => import('@react-three/drei').then(mod => mod.OrbitControls),
  { ssr: false }
)

const SceneWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

// =======================
// 🚀 Модель GLB
// =======================
const Model = () => {
  const { scene } = useGLTF('/assets/model/model.glb')

  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 1) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
      <primitive ref={meshRef} object={scene} position={[0, 0, 0]} castShadow />
    </Float>
  )
}

useGLTF.preload('/assets/model/model.glb')

// =======================
// 🚀 Основная сцена
// =======================
export const ThreeScene = () => (
  <SceneWrapper>
    <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  </SceneWrapper>
)
