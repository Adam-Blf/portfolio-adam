'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import { Loader2, Github, Code2, Database, Cloud, Brain, Blocks } from 'lucide-react'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

interface GitHubRepo {
  id: number
  name: string
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
}

interface LanguageStats {
  [key: string]: number
}

interface SkillCategory {
  key: string
  title: string
  icon: React.ReactNode
  skills: { name: string; count: number }[]
}

// Badge config for shields.io
const skillBadges: Record<string, { logo: string; color: string; logoColor?: string }> = {
  'Python': { logo: 'python', color: '3776AB' },
  'TypeScript': { logo: 'typescript', color: '3178C6' },
  'JavaScript': { logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
  'Java': { logo: 'openjdk', color: 'ED8B00' },
  'C': { logo: 'c', color: 'A8B9CC', logoColor: 'black' },
  'C++': { logo: 'cplusplus', color: '00599C' },
  'HTML': { logo: 'html5', color: 'E34F26' },
  'CSS': { logo: 'css3', color: '1572B6' },
  'SQL': { logo: 'postgresql', color: '4169E1' },
  'Shell': { logo: 'gnubash', color: '4EAA25' },
  'Jupyter Notebook': { logo: 'jupyter', color: 'F37626' },
  'R': { logo: 'r', color: '276DC3' },
  // Frameworks & Libraries
  'React': { logo: 'react', color: '61DAFB', logoColor: 'black' },
  'Next.js': { logo: 'nextdotjs', color: '000000' },
  'Node.js': { logo: 'nodedotjs', color: '339933' },
  'FastAPI': { logo: 'fastapi', color: '009688' },
  'Flask': { logo: 'flask', color: '000000' },
  'Django': { logo: 'django', color: '092E20' },
  'TailwindCSS': { logo: 'tailwindcss', color: '06B6D4' },
  'Three.js': { logo: 'threedotjs', color: '000000' },
  // Data & ML
  'TensorFlow': { logo: 'tensorflow', color: 'FF6F00' },
  'PyTorch': { logo: 'pytorch', color: 'EE4C2C' },
  'Pandas': { logo: 'pandas', color: '150458' },
  'NumPy': { logo: 'numpy', color: '013243' },
  'Scikit-learn': { logo: 'scikitlearn', color: 'F7931E' },
  'Hugging Face': { logo: 'huggingface', color: 'FFD21E', logoColor: 'black' },
  // Cloud & DevOps
  'Docker': { logo: 'docker', color: '2496ED' },
  'Git': { logo: 'git', color: 'F05032' },
  'GitHub': { logo: 'github', color: '181717' },
  'Linux': { logo: 'linux', color: 'FCC624', logoColor: 'black' },
  'Oracle': { logo: 'oracle', color: 'F80000' },
  'PostgreSQL': { logo: 'postgresql', color: '4169E1' },
  'MongoDB': { logo: 'mongodb', color: '47A248' },
  'Vercel': { logo: 'vercel', color: '000000' },
}

// Map topics/keywords to known technologies
const topicToSkill: Record<string, string> = {
  'react': 'React',
  'nextjs': 'Next.js',
  'next-js': 'Next.js',
  'nodejs': 'Node.js',
  'node-js': 'Node.js',
  'fastapi': 'FastAPI',
  'flask': 'Flask',
  'django': 'Django',
  'tailwindcss': 'TailwindCSS',
  'tailwind': 'TailwindCSS',
  'threejs': 'Three.js',
  'three-js': 'Three.js',
  'tensorflow': 'TensorFlow',
  'pytorch': 'PyTorch',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'scikit-learn': 'Scikit-learn',
  'sklearn': 'Scikit-learn',
  'huggingface': 'Hugging Face',
  'transformers': 'Hugging Face',
  'docker': 'Docker',
  'git': 'Git',
  'linux': 'Linux',
  'oracle': 'Oracle',
  'postgresql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'vercel': 'Vercel',
  'machine-learning': 'Machine Learning',
  'deep-learning': 'Deep Learning',
  'nlp': 'NLP',
  'computer-vision': 'Computer Vision',
  'data-science': 'Data Science',
  'data-engineering': 'Data Engineering',
}

// Categorize skills
const categorizeSkill = (skill: string): string => {
  const languages = ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'C++', 'HTML', 'CSS', 'SQL', 'Shell', 'R']
  const frameworks = ['React', 'Next.js', 'Node.js', 'FastAPI', 'Flask', 'Django', 'TailwindCSS', 'Three.js']
  const data = ['Pandas', 'NumPy', 'Jupyter Notebook', 'Data Science', 'Data Engineering']
  const ai = ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision']
  const cloud = ['Docker', 'Git', 'GitHub', 'Linux', 'Oracle', 'PostgreSQL', 'MongoDB', 'Vercel']

  if (languages.includes(skill)) return 'languages'
  if (frameworks.includes(skill)) return 'frameworks'
  if (data.includes(skill)) return 'data'
  if (ai.includes(skill)) return 'ai'
  if (cloud.includes(skill)) return 'cloud'
  return 'other'
}

// Generate shields.io badge URL
const getBadgeUrl = (name: string) => {
  const badge = skillBadges[name]
  if (!badge) return null
  const displayName = name.replace(/\//g, '%2F').replace(/ /g, '%20').replace(/\+/g, '%2B')
  const logoColor = badge.logoColor || 'white'
  return `https://img.shields.io/badge/${displayName}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=${logoColor}`
}

export default function Competences() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRepos, setTotalRepos] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 3600 }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la recuperation des repos')
        }

        const repos: GitHubRepo[] = await response.json()

        // Filter repos
        const filteredRepos = repos.filter(repo =>
          !repo.fork &&
          !repo.archived &&
          !['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam'].includes(repo.name)
        )

        setTotalRepos(filteredRepos.length)

        // Aggregate skills from languages and topics
        const skillCounts: Record<string, number> = {}

        for (const repo of filteredRepos) {
          // Count main language
          if (repo.language) {
            skillCounts[repo.language] = (skillCounts[repo.language] || 0) + 1
          }

          // Count topics mapped to skills
          if (repo.topics) {
            for (const topic of repo.topics) {
              const mappedSkill = topicToSkill[topic.toLowerCase()]
              if (mappedSkill) {
                skillCounts[mappedSkill] = (skillCounts[mappedSkill] || 0) + 1
              }
            }
          }
        }

        // Organize into categories
        const categorized: Record<string, { name: string; count: number }[]> = {
          languages: [],
          frameworks: [],
          data: [],
          ai: [],
          cloud: [],
        }

        for (const [skill, count] of Object.entries(skillCounts)) {
          const category = categorizeSkill(skill)
          if (category !== 'other') {
            categorized[category].push({ name: skill, count })
          }
        }

        // Sort each category by count
        for (const key of Object.keys(categorized)) {
          categorized[key].sort((a, b) => b.count - a.count)
        }

        // Build final categories array
        const finalCategories: SkillCategory[] = [
          { key: 'languages', title: 'Langages', icon: <Code2 size={18} />, skills: categorized.languages },
          { key: 'frameworks', title: 'Frameworks', icon: <Blocks size={18} />, skills: categorized.frameworks },
          { key: 'data', title: 'Data', icon: <Database size={18} />, skills: categorized.data },
          { key: 'ai', title: 'AI / ML', icon: <Brain size={18} />, skills: categorized.ai },
          { key: 'cloud', title: 'Cloud & DevOps', icon: <Cloud size={18} />, skills: categorized.cloud },
        ].filter(cat => cat.skills.length > 0)

        setCategories(finalCategories)
        setLoading(false)
      } catch (err) {
        console.error('GitHub API error:', err)
        setError('Impossible de charger les competences depuis GitHub')
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Header animation
  useEffect(() => {
    if (loading) return
    const header = headerRef.current
    if (header) {
      const caption = header.querySelector('.page-caption')
      const title = header.querySelector('.page-title')
      const description = header.querySelector('.page-description')

      if (caption) {
        animate(caption, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        })
      }

      if (title) {
        animate(title, {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 100,
        })
      }

      if (description) {
        animate(description, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 200,
        })
      }
    }
  }, [loading])

  // Grid animation
  useEffect(() => {
    if (loading) return
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(grid.querySelectorAll('.skill-category'), {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 500,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              delay: stagger(80),
            })
            observer.unobserve(grid)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [loading])

  if (loading) {
    return (
      <>
        <PageBackground variant="data" />
        <main className="pt-32 pb-24">
          <div className="container-wide">
            {/* Header Skeleton */}
            <div className="layout-offset mb-16">
              <div className="h-4 w-40 bg-[--bg-elevated] rounded animate-pulse mb-4" />
              <div className="h-12 w-56 bg-[--bg-elevated] rounded animate-pulse mb-6" />
              <div className="h-6 w-80 bg-[--bg-elevated] rounded animate-pulse" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[--bg-surface] p-6 rounded-lg">
                  <div className="h-8 w-16 bg-[--bg-elevated] rounded animate-pulse mb-2" />
                  <div className="h-4 w-24 bg-[--bg-elevated] rounded animate-pulse" />
                </div>
              ))}
            </div>

            {/* Skills Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[--bg-surface] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-8 bg-[--bg-elevated] rounded animate-pulse" />
                    <div className="h-6 w-32 bg-[--bg-elevated] rounded animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-7 bg-[--bg-elevated] rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageBackground variant="data" />
        <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <Github size={18} />
              <span>Voir directement sur GitHub</span>
            </a>
          </div>
        </main>
      </>
    )
  }

  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <>
      <PageBackground variant="data" />
      <main className="pt-32 pb-24">
        <div className="container-wide">

          {/* Header */}
          <div ref={headerRef} className="layout-offset mb-20">
            <p className="page-caption text-caption mb-4" style={{ opacity: 0 }}>Stack Technique</p>
            <h1 className="page-title text-display mb-6" style={{ opacity: 0 }}>Competences</h1>
            <p className="page-description text-body max-w-xl" style={{ opacity: 0 }}>
              {totalSkills} technologies detectees dans {totalRepos} projets GitHub.
              Donnees en temps reel extraites de mes repositories.
            </p>
          </div>

          {/* Skills Grid */}
          <section ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
            {categories.map((category) => (
              <div
                key={category.key}
                className="skill-category bg-[--bg-primary] p-8 group"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent">{category.icon}</span>
                  <h2 className="text-lg font-medium">{category.title}</h2>
                  <span className="text-xs text-[--text-muted] ml-auto">
                    {category.skills.length} tech{category.skills.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const badgeUrl = getBadgeUrl(skill.name)
                    return badgeUrl ? (
                      <div key={skill.name} className="relative group/skill">
                        <img
                          src={badgeUrl}
                          alt={skill.name}
                          className="h-7 hover:scale-105 transition-transform cursor-default"
                          loading="lazy"
                        />
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[--bg-elevated] text-xs px-2 py-1 rounded opacity-0 group-hover/skill:opacity-100 transition-opacity whitespace-nowrap">
                          {skill.count} projet{skill.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <span
                        key={skill.name}
                        className="tag hover:border-accent transition-colors cursor-default"
                        title={`${skill.count} projet${skill.count > 1 ? 's' : ''}`}
                      >
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* GitHub link */}
          <div className="mt-12 text-center">
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors"
            >
              <Github size={18} />
              <span className="text-sm">Voir tous les projets sur GitHub</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
