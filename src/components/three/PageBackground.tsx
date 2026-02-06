// @ts-nocheck
'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface PageBackgroundProps {
  variant?: 'default' | 'minimal' | 'data' | 'grid' | 'hero'
  accentColor?: string
}

// Hook to detect theme
function useResolvedTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}

// Floating data nodes - for data-related pages
function DataNodes({ color, isDark }: { color: string; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const nodes = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 3,
      ] as [number, number, number],
      scale: 0.03 + Math.random() * 0.06,
      speed: 0.2 + Math.random() * 0.4,
      pulseOffset: Math.random() * Math.PI * 2,
    }))
  }, [])

  // Connection lines between nearby nodes
  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        )
        if (dist < 5) {
          lines.push({ start: nodes[i].position, end: nodes[j].position })
        }
      }
    }
    return lines
  }, [nodes])

  useFrame(({ mouse, clock }) => {
    mouseRef.current.x = (mouse.x * viewport.width) / 2
    mouseRef.current.y = (mouse.y * viewport.height) / 2

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.02,
        0.03
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.02 + clock.getElapsedTime() * 0.02,
        0.03
      )
    }
  })

  const opacity = isDark ? 0.6 : 0.4

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Float key={i} speed={node.speed} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale, 12, 12]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
          {/* Glow around nodes */}
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale * 2, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={opacity * 0.2} />
          </mesh>
        </Float>
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={isDark ? 0.15 : 0.1} />
        </line>
      ))}
    </group>
  )
}

// Minimal floating particles
function MinimalParticles({ color, isDark }: { color: string; isDark: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.015
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={isDark ? 0.5 : 0.35}
        sizeAttenuation
      />
    </points>
  )
}

// Animated grid for tech pages
function TechGrid({ color, isDark }: { color: string; isDark: boolean }) {
  const gridRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  useFrame(({ clock }) => {
    timeRef.current = clock.getElapsedTime()
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 4
      gridRef.current.position.z = -10
      gridRef.current.position.y = -4
    }
  })

  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = []
    const size = 30
    const divisions = 30

    for (let i = -size / 2; i <= size / 2; i += size / divisions) {
      lines.push([[-size / 2, 0, i], [size / 2, 0, i]])
      lines.push([[i, 0, -size / 2], [i, 0, size / 2]])
    }
    return lines
  }, [])

  return (
    <group ref={gridRef}>
      {gridLines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(line.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={isDark ? 0.08 : 0.05} />
        </line>
      ))}
    </group>
  )
}

// Floating geometric shapes
function FloatingGeometry({ color, isDark }: { color: string; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const shapes = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      type: ['icosahedron', 'octahedron', 'tetrahedron', 'dodecahedron'][i % 4] as string,
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.25,
      scale: 0.3 + Math.random() * 0.6,
      distort: Math.random() * 0.3,
    }))
  }, [])

  useFrame(({ mouse }) => {
    mouseRef.current.x = (mouse.x * viewport.width) / 2
    mouseRef.current.y = (mouse.y * viewport.height) / 2

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.03,
        0.04
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.03,
        0.04
      )
    }
  })

  const opacity = isDark ? 0.25 : 0.15

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={0.4} floatIntensity={0.4}>
          <mesh position={shape.position} scale={shape.scale} rotation={[shape.rotation, shape.rotation, 0]}>
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[0.5, 0]} />}
            {shape.type === 'octahedron' && <octahedronGeometry args={[0.4, 0]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.35, 0]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[0.35, 0]} />}
            <meshStandardMaterial color={color} wireframe transparent opacity={opacity} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Hero background with distorted sphere
function HeroScene({ color, isDark }: { color: string; isDark: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useFrame(({ mouse, clock }) => {
    mouseRef.current.x = mouse.x
    mouseRef.current.y = mouse.y

    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouseRef.current.x * 0.5,
        0.05
      )
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mouseRef.current.y * 0.3,
        0.05
      )
    }
  })

  return (
    <>
      {/* Main distorted sphere */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={sphereRef} position={[3, 0, -3]} scale={2}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color={color}
            wireframe
            transparent
            opacity={isDark ? 0.35 : 0.2}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Accent ring */}
      <Float speed={0.3} rotationIntensity={0.1}>
        <mesh position={[-4, 1, -5]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.03, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={isDark ? 0.4 : 0.25} />
        </mesh>
      </Float>

      {/* Secondary ring */}
      <Float speed={0.4} rotationIntensity={0.15}>
        <mesh position={[4, -2, -6]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2, 0.02, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={isDark ? 0.25 : 0.15} />
        </mesh>
      </Float>

      <MinimalParticles color={color} isDark={isDark} />
    </>
  )
}

function Scene({ variant, accentColor, isDark }: { variant: string; accentColor: string; isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.3 : 0.4} />

      {variant === 'default' && (
        <>
          <FloatingGeometry color={accentColor} isDark={isDark} />
          <MinimalParticles color={accentColor} isDark={isDark} />
        </>
      )}

      {variant === 'minimal' && <MinimalParticles color={accentColor} isDark={isDark} />}

      {variant === 'data' && (
        <>
          <DataNodes color={accentColor} isDark={isDark} />
          <TechGrid color={accentColor} isDark={isDark} />
        </>
      )}

      {variant === 'grid' && (
        <>
          <TechGrid color={accentColor} isDark={isDark} />
          <MinimalParticles color={accentColor} isDark={isDark} />
        </>
      )}

      {variant === 'hero' && <HeroScene color={accentColor} isDark={isDark} />}
    </>
  )
}

export default function PageBackground({ variant = 'default', accentColor = '#e07a5f' }: PageBackgroundProps) {
  const isDark = useResolvedTheme()
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  if (!hasWebGL) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-500">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: true }}
        style={{ opacity: isDark ? 1 : 0.7 }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} accentColor={accentColor} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
