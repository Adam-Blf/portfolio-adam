import MinimalProHero from '@/components/sections/MinimalProHero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import AboutPreview from '@/components/sections/AboutPreview'
import SkillsPreview from '@/components/sections/SkillsPreview'

export default function Home() {
  return (
    <div className="flex flex-col">
      <MinimalProHero />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsPreview />
    </div>
  )
}
