import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsPreview from '@/components/sections/SkillsPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
    </>
  )
}
