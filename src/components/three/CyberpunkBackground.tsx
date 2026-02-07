'use client'

import { useRef, useMemo, useEffect, useState, memo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Points as PointsType } from 'three'
import * as THREE from 'three'

// Morphing blob with noise-based distortion
const MorphingBlob = memo(function MorphingBlob({ color = '#FFB000', position = [0, 0, -3] as [number, number, number] }: { color?: string; position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const geometry = meshRef.current.geometry as THREE.IcosahedronGeometry
    const positions = geometry.attributes.position.array as Float32Array

    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(positions)
    }

    const t = state.clock.elapsedTime * 0.5

    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions.current[i]
      const oy = originalPositions.current[i + 1]
      const oz = originalPositions.current[i + 2]

      const noise = Math.sin(ox * 2 + t) * 0.1 +
                    Math.cos(oy * 2 + t * 1.3) * 0.1 +
                    Math.sin(oz * 2 + t * 0.7) * 0.1

      const length = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const scale = 1 + noise * 0.3

      positions[i] = (ox / length) * scale * length
      positions[i + 1] = (oy / length) * scale * length
      positions[i + 2] = (oz / length) * scale * length
    }

    geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.5, 4]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
})

// Floating geometric shapes with different forms
const FloatingGeometry = memo(function FloatingGeometry({
  type = 'octahedron',
  position,
  scale,
  color,
  rotationSpeed = 0.3
}: {
  type?: 'octahedron' | 'tetrahedron' | 'torus' | 'ring'
  position: [number, number, number]
  scale: number
  color: string
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = useRef(position[1])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * rotationSpeed * 0.5
    meshRef.current.rotation.y = t * rotationSpeed
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.2
    meshRef.current.position.y = initialY.current + Math.sin(t * 0.5 + position[0]) * 0.3
  })

  const geometry = useMemo(() => {
    switch (type) {
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.3, 8, 24]} />
      case 'ring':
        return <ringGeometry args={[0.8, 1, 6]} />
      default:
        return <octahedronGeometry args={[1, 0]} />
    }
  }, [type])

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
})

// Data stream particles flowing upward
const DataStream = memo(function DataStream({ count = 200, color = '#FFB000' }: { count?: number; color?: string }) {
  const ref = useRef<PointsType>(null)
  const { viewport } = useThree()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Create vertical streams at specific x positions
      const streamX = (Math.random() - 0.5) * viewport.width * 1.5
      pos[i * 3] = streamX + (Math.random() - 0.5) * 0.5
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 5
      vel[i] = 0.02 + Math.random() * 0.04
    }

    return { positions: pos, velocities: vel }
  }, [count, viewport.width, viewport.height])

  useFrame((state, delta) => {
    if (!ref.current) return
    const posArray = ref.current.geometry.attributes.position.array as Float32Array
    const heightLimit = viewport.height * 1.5

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1
      posArray[idx] += velocities[i] * delta * 60

      if (posArray[idx] > heightLimit) {
        posArray[idx] = -heightLimit
        posArray[i * 3] = (Math.random() - 0.5) * viewport.width * 1.5 + (Math.random() - 0.5) * 0.5
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
})

// Ambient dust particles
const AmbientDust = memo(function AmbientDust({ count = 500, color = '#FFB000' }: { count?: number; color?: string }) {
  const ref = useRef<PointsType>(null)
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 3
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return positions
  }, [count, viewport.width, viewport.height])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.1
    ref.current.rotation.x = Math.cos(t * 0.03) * 0.05
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
})

// Grid floor with perspective
const PerspectiveGrid = memo(function PerspectiveGrid({ color = '#FFB000' }: { color?: string }) {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 1
  })

  return (
    <group position={[0, -4, 0]} rotation={[0, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[50, 50, color, '#1a1a2e']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
})

// Orbiting ring with glow
const OrbitRing = memo(function OrbitRing({
  radius = 3,
  color = '#FFB000',
  speed = 0.5
}: {
  radius?: number
  color?: string
  speed?: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = state.clock.elapsedTime * speed
  })

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Small orbiting sphere */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
})

// Main scene composition
const Scene = memo(function Scene({ variant = 'hero' }: { variant?: 'hero' | 'page' }) {
  const { viewport } = useThree()

  return (
    <>
      <ambientLight intensity={0.1} />

      {/* Central morphing blob */}
      {variant === 'hero' && (
        <MorphingBlob color="#FFB000" position={[viewport.width * 0.15, 0, -4]} />
      )}

      {/* Data streams */}
      <DataStream count={150} color="#FFB000" />

      {/* Ambient particles */}
      <AmbientDust count={400} color="#FFB000" />

      {/* Floating geometries */}
      <FloatingGeometry
        type="octahedron"
        position={[viewport.width * -0.3, viewport.height * 0.2, -5]}
        scale={0.4}
        color="#FFB000"
      />
      <FloatingGeometry
        type="tetrahedron"
        position={[viewport.width * 0.35, viewport.height * -0.15, -6]}
        scale={0.35}
        color="#00E5FF"
      />
      <FloatingGeometry
        type="torus"
        position={[viewport.width * -0.25, viewport.height * -0.3, -7]}
        scale={0.25}
        color="#8B5CF6"
      />

      {/* Orbit rings */}
      {variant === 'hero' && (
        <>
          <OrbitRing radius={2.5} color="#FFB000" speed={0.3} />
          <OrbitRing radius={3.5} color="#00E5FF" speed={-0.2} />
        </>
      )}

      {/* Grid floor */}
      <PerspectiveGrid color="#FFB000" />
    </>
  )
})

interface CyberpunkBackgroundProps {
  variant?: 'hero' | 'page'
}

export default function CyberpunkBackground({ variant = 'hero' }: CyberpunkBackgroundProps) {
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

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[--bg-deep] via-[--bg-surface] to-[--bg-deep]">
        <div className="absolute inset-0 data-grid opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[--accent]/5 to-transparent" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
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
        <Scene variant={variant} />
      </Canvas>
    </div>
  )
}
