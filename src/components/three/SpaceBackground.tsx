'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import SafeCanvas from '@/components/three/SafeCanvas'
import * as THREE from 'three'

// Floating data particles
function DataParticles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFB000"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Floating geometric shapes
function FloatingShape({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

// Ambient grid floor
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#FFB000"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  )
}

// Scene content
function Scene({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'dense' }) {
  const particleCount = variant === 'dense' ? 100 : variant === 'minimal' ? 20 : 50
  const shapeCount = variant === 'dense' ? 8 : variant === 'minimal' ? 3 : 5

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#FFB000" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#3b82f6" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={variant === 'minimal' ? 1000 : 2000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Data particles */}
      <DataParticles count={particleCount} />

      {/* Floating shapes */}
      {Array.from({ length: shapeCount }).map((_, i) => (
        <FloatingShape
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8 - 3
          ]}
          color={i % 2 === 0 ? '#FFB000' : '#3b82f6'}
        />
      ))}

      {/* Grid floor for depth */}
      {variant !== 'minimal' && <GridFloor />}
    </>
  )
}

interface SpaceBackgroundProps {
  variant?: 'default' | 'minimal' | 'dense'
  className?: string
}

export default function SpaceBackground({ variant = 'default', className = '' }: SpaceBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <SafeCanvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: '#050508' }}
      >
        <Scene variant={variant} />
      </SafeCanvas>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/30 via-transparent to-[#050508]" />
    </div>
  )
}
