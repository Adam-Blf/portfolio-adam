'use client'

import { useRef, useMemo, useEffect, useState, memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import SafeCanvas from '@/components/three/SafeCanvas'
import type { Points as PointsType } from 'three'
import * as THREE from 'three'

interface PageBackgroundProps {
  variant?: 'default' | 'minimal' | 'data' | 'grid' | 'hero'
  accentColor?: string
}

// Optimized ambient floating particles
const AmbientParticles = memo(function AmbientParticles({ count = 400, color = '#FFB000' }: { count?: number; color?: string }) {
  const ref = useRef<PointsType>(null)
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2.5
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4
    }

    return positions
  }, [count, viewport.width, viewport.height])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.04
    ref.current.rotation.y = Math.cos(t * 0.06) * 0.04
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
})

// Optimized subtle wave mesh - reduced geometry complexity
const WaveMesh = memo(function WaveMesh({ color = '#FFB000' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry
    const positions = geometry.attributes.position.array as Float32Array

    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(positions)
    }

    const t = state.clock.elapsedTime
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions.current[i]
      const y = originalPositions.current[i + 1]
      positions[i + 2] = Math.sin(x * 0.4 + t * 0.4) * 0.08 +
                         Math.cos(y * 0.4 + t * 0.25) * 0.08
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[18, 18, 24, 24]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  )
})

// Optimized data nodes with connections - reduced sphere segments
const DataNodes = memo(function DataNodes({ color = '#FFB000' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Line>(null)
  const { viewport } = useThree()

  const nodes = useMemo(() => {
    const result = []
    for (let i = 0; i < 6; i++) {
      result.push({
        position: [
          (Math.random() - 0.5) * viewport.width * 0.7,
          (Math.random() - 0.5) * viewport.height * 0.7,
          -3 - Math.random() * 1.5
        ] as [number, number, number],
        scale: 0.025 + Math.random() * 0.015
      })
    }
    return result
  }, [viewport.width, viewport.height])

  // Create line object
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = nodes.map(node => new THREE.Vector3(...node.position))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.12 })
    return new THREE.Line(geometry, material)
  }, [nodes, color])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.015
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
      <primitive object={lineObj} />
    </group>
  )
})

// Optimized floating ring - reduced tube segments
const FloatingRing = memo(function FloatingRing({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = useRef(position[1])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.z = t * 0.08
    meshRef.current.position.y = initialY.current + Math.sin(t * 0.4) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 8, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
      />
    </mesh>
  )
})

// Optimized grid helper with animation
const AnimatedGrid = memo(function AnimatedGrid({ color = '#FFB000' }: { color?: string }) {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = (state.clock.elapsedTime * 0.15) % 1
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, color, '#1a1a2e']}
      position={[0, -3, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
})

// Scene for different variants - memoized
const Scene = memo(function Scene({ variant = 'default', color = '#FFB000' }: { variant: string; color: string }) {
  const { viewport } = useThree()

  const particleCount = variant === 'minimal' ? 150 : variant === 'data' ? 400 : 300

  return (
    <>
      <ambientLight intensity={0.15} />

      <AmbientParticles count={particleCount} color={color} />

      {variant === 'data' && <DataNodes color={color} />}

      {variant === 'grid' && <AnimatedGrid color={color} />}

      {(variant === 'default' || variant === 'hero') && (
        <>
          <WaveMesh color={color} />
          <FloatingRing position={[viewport.width * 0.3, 0.4, -3]} scale={0.35} color={color} />
          <FloatingRing position={[-viewport.width * 0.2, -0.4, -4]} scale={0.2} color="#00E5FF" />
        </>
      )}
    </>
  )
})

export default function PageBackground({ variant = 'default', accentColor = '#FFB000' }: PageBackgroundProps) {
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
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[--bg-deep] via-[--bg-surface] to-[--bg-deep]">
        <div className="absolute inset-0 data-grid opacity-20" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <SafeCanvas
        camera={{ position: [0, 0, 5], fov: 55 }}
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
        <Scene variant={variant} color={accentColor} />
      </SafeCanvas>
    </div>
  )
}
