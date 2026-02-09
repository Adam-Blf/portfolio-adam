'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import Image from 'next/image'
import * as THREE from 'three'
import { ArrowRight, Sparkles, Cpu, Database, Code2 } from 'lucide-react'
import SafeCanvas from '@/components/three/SafeCanvas'

/**
 * DATA UNIVERSE - Immersive 3D Experience
 *
 * Design Philosophy:
 * - Cosmic data visualization
 * - Interactive 3D elements
 * - Particle systems representing data flow
 * - Deep space aesthetic with warm accents
 */

// Floating data particle
function DataParticle({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      <octahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial
        color={hovered ? "#FFB000" : "#ffffff"}
        emissive={hovered ? "#FFB000" : "#FFB000"}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Data stream - flowing particles
function DataStream({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 50

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount
    positions[i * 3] = start[0] + (end[0] - start[0]) * t
    positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t
    positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
  }

  useFrame((state) => {
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const t = ((i / particleCount) + state.clock.elapsedTime * 0.2) % 1
      positions[i * 3] = start[0] + (end[0] - start[0]) * t
      positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI * 2) * 0.1
      positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFB000"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Central data core
function DataCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group position={[2, 0, 0]}>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#0a0a0f"
          emissive="#FFB000"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#FFB000"
          emissive="#FFB000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#FFB000"
          emissive="#FFB000"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floating particles around core */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 1.2
        return (
          <DataParticle
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * 0.3,
              Math.sin(angle) * radius
            ]}
            delay={i * 0.5}
          />
        )
      })}
    </group>
  )
}

// Camera controller with subtle movement
function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.2
    camera.lookAt(0, 0, 0)
  })

  return null
}

// 3D Scene
function Scene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFB000" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Central data core */}
      <DataCore />

      {/* Data streams */}
      <DataStream start={[-3, 1, -2]} end={[1.5, 0.3, 0]} />
      <DataStream start={[-2, -1, -1]} end={[1.5, -0.3, 0]} />
      <DataStream start={[-3, 0, 1]} end={[1.5, 0, 0]} />

      {/* Scattered data particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <DataParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 6 - 2
          ]}
          delay={Math.random() * 10}
        />
      ))}

      <Environment preset="night" />
    </>
  )
}

// Skill badge component
function SkillBadge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="skill-badge opacity-0 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-400 hover:border-amber-500/50 hover:text-amber-500 transition-all cursor-default">
      <Icon size={12} />
      {label}
    </div>
  )
}

export default function DataUniverseHero() {
  const containerRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const container = containerRef.current
    if (!container) return

    // Text animations
    try {
      const titles = container.querySelectorAll('.title-line')
      animate(titles, {
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(100, { start: 500 }),
        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
      })

      // Content fade in
      const content = container.querySelectorAll('.content-reveal')
      animate(content, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(80, { start: 1000 }),
        easing: 'cubicBezier(0.4, 0, 0.2, 1)'
      })

      // Skill badges
      const badges = container.querySelectorAll('.skill-badge')
      animate(badges, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(50, { start: 1400 }),
        easing: 'cubicBezier(0.4, 0, 0.2, 1)'
      })
    } catch (e) {
      console.warn('Animation error:', e)
      // Make content visible even if animations fail
      container.querySelectorAll('.title-line, .content-reveal, .skill-badge').forEach(el => {
        (el as HTMLElement).style.opacity = '1'
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center overflow-hidden bg-[#050508]"
    >
      {/* 3D Canvas - Full background */}
      <div className="absolute inset-0">
        <SafeCanvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          fallback={<div className="w-full h-full bg-[#050508]" />}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </SafeCanvas>
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Status indicator */}
          <div className="content-reveal opacity-0 flex items-center gap-3 mb-8">
            <span className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Sparkles size={12} className="text-amber-500" />
              SYSTEM ONLINE
            </span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          {/* Main title */}
          <h1 className="mb-6">
            <span className="block overflow-hidden">
              <span className="title-line block text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight text-white opacity-0">
                Adam
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="title-line block text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight text-amber-500 opacity-0">
                Beloucif
              </span>
            </span>
          </h1>

          {/* Role */}
          <div className="content-reveal opacity-0 mb-6">
            <p className="text-xl md:text-2xl text-zinc-300 font-light">
              Data Engineer & Fullstack Developer
            </p>
          </div>

          {/* Description */}
          <p className="content-reveal opacity-0 text-zinc-500 text-base leading-relaxed mb-8 max-w-lg">
            Transforming complex data flows into intelligent systems.
            Currently engineering healthcare data solutions at GHT Psy Sud Paris.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <SkillBadge icon={Database} label="Data Engineering" />
            <SkillBadge icon={Code2} label="Fullstack Dev" />
            <SkillBadge icon={Cpu} label="AI/ML" />
          </div>

          {/* CTAs */}
          <div className="content-reveal opacity-0 flex items-center gap-6">
            <Link
              href="/pokedex"
              className="group flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold text-sm rounded-full hover:bg-amber-400 transition-colors"
            >
              Explore Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/centre-pokemon"
              className="text-zinc-400 hover:text-amber-500 text-sm transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="content-reveal opacity-0 flex gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: '37+', label: 'Projects' },
              { value: '3+', label: 'Years XP' },
              { value: '25', label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                <p className="text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo - Floating card */}
      <div className="hidden lg:block absolute right-12 bottom-12 z-20">
        <div className="content-reveal opacity-0 relative">
          <div className="w-48 h-60 overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-amber-500/10">
            <Image
              src="/images/adam-photo.jpg"
              alt="Adam Beloucif"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          {/* Location tag */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs text-zinc-400">
            Paris, France
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="content-reveal opacity-0 flex flex-col items-center gap-2">
          <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}
