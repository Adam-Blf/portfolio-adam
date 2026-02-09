'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function CompetencesRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/types') }, [router])
  return null
}
