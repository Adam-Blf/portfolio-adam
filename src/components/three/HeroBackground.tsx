// @ts-nocheck
'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Register Three.js classes with R3F
extend({ Points: THREE.Points, Line: THREE.Line })

// Theme detection
function useResolvedTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}

// Data flow particles - like data streaming
function DataStream({ color, isDark }: { color: string; isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 500

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const off = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute in streams
      const stream = Math.floor(Math.random() * 8)
      const streamX = (stream - 4) * 3 + (Math.random() - 0.5) * 2

      pos[i * 3] = streamX
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 8
      spd[i] = 0.5 + Math.random() * 1.5
      off[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, speeds: spd, offsets: off }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      // Move upward like data flowing
      posArray[i * 3 + 1] += speeds[i] * 0.03

      // Reset when out of view
      if (posArray[i * 3 + 1] > 15) {
        posArray[i * 3 + 1] = -15
      }

      // Subtle horizontal wave
      posArray[i * 3] += Math.sin(clock.getElapsedTime() * 0.5 + offsets[i]) * 0.002
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={isDark ? 0.7 : 0.5}
        sizeAttenuation
      />
    </points>
  )
}

// Floating data nodes with connections
function DataNetwork({ color, secondaryColor, isDark }: { color: string; secondaryColor: string; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4,
      ] as [number, number, number],
      scale: 0.04 + Math.random() * 0.06,
      isHighlight: Math.random() > 0.7,
    }))
  }, [])

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
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.02 + clock.getElapsedTime() * 0.03,
        0.02
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.015,
        0.02
      )
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={0.3} rotationIntensity={0} floatIntensity={0.2}>
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale, 8, 8]} />
            <meshBasicMaterial
              color={node.isHighlight ? secondaryColor : color}
              transparent
              opacity={isDark ? 0.9 : 0.7}
            />
          </mesh>
          {/* Glow */}
          <mesh position={node.position}>
            <sphereGeometry args={[node.scale * 3, 6, 6]} />
            <meshBasicMaterial
              color={node.isHighlight ? secondaryColor : color}
              transparent
              opacity={isDark ? 0.15 : 0.1}
            />
          </mesh>
        </Float>
      ))}

      {connections.map((conn, i) => (
        <line key={`conn-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...conn.start, ...conn.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={isDark ? 0.12 : 0.08} />
        </line>
      ))}
    </group>
  )
}

// Animated grid floor
function DataGrid({ color, isDark }: { color: string; isDark: boolean }) {
  const gridRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2.2
      gridRef.current.position.y = -4
      gridRef.current.position.z = -6
    }
  })

  const gridLines = useMemo(() => {
    const lines: { points: [number, number, number][]; major: boolean }[] = []
    const size = 40
    const majorStep = 5
    const minorStep = 1

    for (let i = -size / 2; i <= size / 2; i += minorStep) {
      const isMajor = i % majorStep === 0
      lines.push({
        points: [[-size / 2, 0, i], [size / 2, 0, i]],
        major: isMajor,
      })
      lines.push({
        points: [[i, 0, -size / 2], [i, 0, size / 2]],
        major: isMajor,
      })
    }
    return lines
  }, [])

  return (
    <group ref={gridRef}>
      {gridLines.map((gridLine, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array(gridLine.points.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={isDark ? (gridLine.major ? 0.12 : 0.04) : (gridLine.major ? 0.08 : 0.03)}
          />
        </line>
      ))}
    </group>
  )
}

// Floating geometric shapes
function FloatingShapes({ color, secondaryColor, tertiaryColor, isDark }: {
  color: string
  secondaryColor: string
  tertiaryColor: string
  isDark: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const shapes = useMemo(() => [
    { type: 'octahedron', position: [5, 1, -3] as [number, number, number], scale: 1.2, color: color },
    { type: 'icosahedron', position: [-4, 2, -4] as [number, number, number], scale: 0.8, color: secondaryColor },
    { type: 'box', position: [3, -1, -2] as [number, number, number], scale: 0.6, color: tertiaryColor },
    { type: 'tetrahedron', position: [-3, -1.5, -3] as [number, number, number], scale: 0.7, color: color },
    { type: 'torus', position: [0, 3, -5] as [number, number, number], scale: 0.5, color: secondaryColor },
  ], [color, secondaryColor, tertiaryColor])

  useFrame(({ mouse, clock }) => {
    mouseRef.current.x = (mouse.x * viewport.width) / 2
    mouseRef.current.y = (mouse.y * viewport.height) / 2

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.03,
        0.03
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.02,
        0.03
      )

      // Rotate individual shapes
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.002 * (i + 1)
        child.rotation.y += 0.003 * (i + 1)
      })
    }
  })

  const opacity = isDark ? 0.25 : 0.18

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={0.4 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={shape.position} scale={shape.scale}>
            {shape.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
            {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
            {shape.type === 'torus' && <torusGeometry args={[1, 0.4, 8, 16]} />}
            <meshBasicMaterial color={shape.color} wireframe transparent opacity={opacity} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Scene({ isDark }: { isDark: boolean }) {
  // Colors matching the CSS design system (orange primary from logo)
  const accentColor = isDark ? '#FFB000' : '#D97706'
  const highlightColor = isDark ? '#00E5FF' : '#0891B2'
  const tertiaryColor = isDark ? '#8B5CF6' : '#7C3AED'

  return (
    <>
      <ambientLight intensity={0.15} />
      <DataGrid color={accentColor} isDark={isDark} />
      <DataStream color={accentColor} isDark={isDark} />
      <DataNetwork color={accentColor} secondaryColor={highlightColor} isDark={isDark} />
      <FloatingShapes
        color={accentColor}
        secondaryColor={highlightColor}
        tertiaryColor={tertiaryColor}
        isDark={isDark}
      />
    </>
  )
}

export default function HeroBackground() {
  const isDark = useResolvedTheme()

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  )
}
