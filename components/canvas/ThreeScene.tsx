'use client'

import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import styled from 'styled-components'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

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

const LogoGeometry = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // колебание по оси X: амплитуда 0.5, скорость 1
      meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 1) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef} castShadow position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.18, 180, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0}
          roughness={1}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

export const ThreeScene = () => (
  <SceneWrapper>
    <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Suspense fallback={null}>
        <LogoGeometry />
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
