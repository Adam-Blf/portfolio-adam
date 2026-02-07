'use client'

import { useEffect, useState, ReactNode } from 'react'
import { Canvas, CanvasProps } from '@react-three/fiber'
import ErrorBoundary from '@/components/ErrorBoundary'

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('webgl2'))
    )
  } catch {
    return false
  }
}

interface SafeCanvasProps extends Omit<CanvasProps, 'gl'> {
  gl?: CanvasProps['gl']
  fallback?: ReactNode
  children: ReactNode
}

/**
 * A Canvas wrapper that:
 * 1. Checks WebGL availability before rendering
 * 2. Wraps in ErrorBoundary to catch Three.js crashes
 * 3. Sets failIfMajorPerformanceCaveat: false for broad compatibility
 */
export default function SafeCanvas({ children, fallback, gl, ...props }: SafeCanvasProps) {
  const [webGLSupported, setWebGLSupported] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWebGLSupported(isWebGLAvailable())
  }, [])

  if (!mounted) return fallback ?? null

  if (!webGLSupported) {
    return <>{fallback ?? null}</>
  }

  const glConfig = {
    antialias: true,
    alpha: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'default' as const,
    ...(typeof gl === 'object' ? gl : {}),
  }

  return (
    <ErrorBoundary fallback={fallback ?? null}>
      <Canvas gl={glConfig} {...props}>
        {children}
      </Canvas>
    </ErrorBoundary>
  )
}
