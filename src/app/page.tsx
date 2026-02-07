'use client'

import MinimalProHero from '@/components/sections/MinimalProHero'
import Stats from '@/components/sections/Stats'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsPreview from '@/components/sections/SkillsPreview'
import CallToAction from '@/components/sections/CallToAction'
import SectionDivider from '@/components/ui/SectionDivider'

export default function Home() {
  return (
    <>
      <MinimalProHero />
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
