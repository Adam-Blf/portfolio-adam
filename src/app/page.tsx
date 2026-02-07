'use client'

import dynamic from 'next/dynamic'
import Stats from '@/components/sections/Stats'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsPreview from '@/components/sections/SkillsPreview'
import CallToAction from '@/components/sections/CallToAction'
import SectionDivider from '@/components/ui/SectionDivider'

const DataUniverseHero = dynamic(
  () => import('@/components/designs/DataUniverseHero'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <DataUniverseHero />
      <Stats />
      <SectionDivider variant="diamond" />
      <AboutPreview />
      <SectionDivider variant="gradient" />
      <FeaturedProjects />
      <SectionDivider variant="diamond" />
      <SkillsPreview />
      <SectionDivider variant="gradient" />
      <CallToAction />
    </>
  )
}
