'use client'

import MinimalProHero from '@/components/sections/MinimalProHero'
import Stats from '@/components/sections/Stats'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsPreview from '@/components/sections/SkillsPreview'
import CallToAction from '@/components/sections/CallToAction'

export default function Home() {
  return (
    <div>
      <MinimalProHero />
      <Stats />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
      <CallToAction />
    </div>
  )
}
