'use client'

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import SafeCanvas from '@/components/three/SafeCanvas'
import type { Points as PointsType } from 'three'
import * as THREE from 'three'

// Optimized data stream particles with GPU-friendly updates
function DataParticles({ count = 1500 }: { count?: number }) {
  const ref = useRef<PointsType>(null)
  const { viewport } = useThree()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      vel[i] = 0.008 + Math.random() * 0.02
    }

    return { positions: pos, velocities: vel }
  }, [count, viewport.width, viewport.height])

  useFrame((state, delta) => {
    if (!ref.current) return
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    const heightLimit = viewport.height * 1.2

    // Batch update for better performance
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1
      posArray[idx] += velocities[i] * delta * 60

      if (posArray[idx] > heightLimit) {
        posArray[idx] = -heightLimit
        posArray[i * 3] = (Math.random() - 0.5) * viewport.width * 2
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#FFB000"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Optimized floating geometric shapes - no hover state (reduces re-renders)
function FloatingShape({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = useRef(position[1])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.25
    meshRef.current.rotation.y = Math.cos(t * 0.25) * 0.25
    meshRef.current.position.y = initialY.current + Math.sin(t * 0.6) * 0.15
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  )
}

// Optimized grid floor effect
function DataGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state, delta) => {
    if (!gridRef.current) return
    gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 1
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[25, 25, '#FFB000', '#1a1a2e']}
      position={[0, -3, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

// Optimized mouse-following light with lerp
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { pointer, viewport } = useThree()
  const targetPos = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (!lightRef.current) return
    targetPos.current.x = pointer.x * viewport.width * 0.4
    targetPos.current.y = pointer.y * viewport.height * 0.4

    // Smooth lerp for better feel
    lightRef.current.position.x += (targetPos.current.x - lightRef.current.position.x) * 0.08
    lightRef.current.position.y += (targetPos.current.y - lightRef.current.position.y) * 0.08
  })

  return (
    <pointLight
      ref={lightRef}
      color="#FFB000"
      intensity={0.4}
      distance={8}
      position={[0, 0, 2.5]}
    />
  )
}

// Main scene - memoized for performance
function Scene() {
  const { viewport } = useThree()

  return (
    <>
      <ambientLight intensity={0.15} />
      <MouseLight />

      <DataParticles count={1200} />
      <DataGrid />

      {/* Floating shapes - positioned relative to viewport */}
      <FloatingShape position={[viewport.width * 0.25, viewport.height * 0.15, -2]} scale={0.4} color="#FFB000" />
      <FloatingShape position={[-viewport.width * 0.25, -viewport.height * 0.1, -3]} scale={0.25} color="#00E5FF" />
      <FloatingShape position={[viewport.width * 0.15, -viewport.height * 0.25, -4]} scale={0.35} color="#8B5CF6" />
    </>
  )
}

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (!mounted) return null

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[--bg-deep] via-[--bg-surface] to-[--bg-deep]">
        <div className="absolute inset-0 data-grid opacity-30" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <SafeCanvas
        camera={{ position: [0, 0, 5], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <Scene />
      </SafeCanvas>
    </div>
  )
}
