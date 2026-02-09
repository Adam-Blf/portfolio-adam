'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function ProjetsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/pokedex') }, [router])
  return null
}
