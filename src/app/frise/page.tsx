'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function FriseRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/timeline') }, [router])
  return null
}
