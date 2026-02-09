'use client'

import { useState, useEffect } from 'react'
import { Github, Code2, Database, Cloud, Brain, Blocks, Server, Award, BarChart3, TrendingUp } from 'lucide-react'
import { skills as staticSkills, certifications, personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
}

interface SkillData {
  name: string
  count: number
}

interface CachedCategory {
  key: string
  title: string
  skills: SkillData[]
}

interface SkillCategory extends CachedCategory {
  icon: React.ReactNode
}

// Pokemon type colors per category
const categoryTypeColors: Record<string, { bg: string; text: string; label: string; light: string }> = {
  languages: { bg: '#A8A878', text: '#fff', label: 'NORMAL', light: '#C6C6A7' },
  frameworks: { bg: '#F8D030', text: '#333', label: 'ELECTRIC', light: '#FAE078' },
  data: { bg: '#6890F0', text: '#fff', label: 'WATER', light: '#9DB7F5' },
  ai: { bg: '#F95587', text: '#fff', label: 'PSYCHIC', light: '#FA92B2' },
  databases: { bg: '#E0C068', text: '#333', label: 'GROUND', light: '#EBD69D' },
  cloud: { bg: '#A890F0', text: '#fff', label: 'FLYING', light: '#C6B7F5' },
}

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 size={20} />,
  frameworks: <Blocks size={20} />,
  data: <Database size={20} />,
  ai: <Brain size={20} />,
  databases: <Server size={20} />,
  cloud: <Cloud size={20} />,
}

const addIconsToCategories = (cached: CachedCategory[]): SkillCategory[] => {
  return cached.map(cat => ({
    ...cat,
    icon: categoryIcons[cat.key] || <Code2 size={20} />,
  }))
}

const topicToSkill: Record<string, string> = {
  'react': 'React', 'reactjs': 'React', 'nextjs': 'Next.js', 'next-js': 'Next.js', 'next': 'Next.js',
  'vue': 'Vue.js', 'vuejs': 'Vue.js', 'angular': 'Angular', 'svelte': 'Svelte',
  'nodejs': 'Node.js', 'node-js': 'Node.js', 'node': 'Node.js',
  'express': 'Express', 'expressjs': 'Express', 'fastapi': 'FastAPI', 'flask': 'Flask',
  'django': 'Django', 'streamlit': 'Streamlit', 'dotnet': '.NET',
  'tailwindcss': 'TailwindCSS', 'tailwind': 'TailwindCSS', 'bootstrap': 'Bootstrap',
  'threejs': 'Three.js', 'three-js': 'Three.js',
  'tensorflow': 'TensorFlow', 'pytorch': 'PyTorch', 'keras': 'Keras',
  'pandas': 'Pandas', 'numpy': 'NumPy', 'scikit-learn': 'Scikit-learn', 'sklearn': 'Scikit-learn',
  'huggingface': 'Hugging Face', 'transformers': 'Transformers', 'openai': 'OpenAI', 'langchain': 'LangChain',
  'matplotlib': 'Matplotlib', 'plotly': 'Plotly', 'seaborn': 'Seaborn',
  'mediapipe': 'MediaPipe', 'nltk': 'NLTK', 'spacy': 'spaCy',
  'sbert': 'SBERT', 'sentence-transformers': 'SBERT',
  'machine-learning': 'Machine Learning', 'deep-learning': 'Deep Learning',
  'nlp': 'NLP', 'natural-language-processing': 'NLP',
  'computer-vision': 'Computer Vision', 'data-science': 'Data Science', 'data-engineering': 'Data Engineering',
  'artificial-intelligence': 'AI', 'ai': 'AI', 'ml': 'Machine Learning',
  'llm': 'LLM', 'rag': 'RAG', 'chatbot': 'Chatbot', 'recommendation': 'Recommendation Systems',
  'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
  'git': 'Git', 'github': 'GitHub', 'gitlab': 'GitLab', 'linux': 'Linux',
  'aws': 'AWS', 'azure': 'Azure', 'gcp': 'GCP',
  'vercel': 'Vercel', 'netlify': 'Netlify', 'heroku': 'Heroku',
  'ci-cd': 'CI/CD', 'github-actions': 'GitHub Actions',
  'oracle': 'Oracle', 'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
  'mysql': 'MySQL', 'mongodb': 'MongoDB', 'mongo': 'MongoDB',
  'redis': 'Redis', 'sqlite': 'SQLite', 'firebase': 'Firebase', 'supabase': 'Supabase',
  'pwa': 'PWA', 'progressive-web-app': 'PWA', 'api': 'REST API', 'rest': 'REST API',
  'graphql': 'GraphQL', 'websocket': 'WebSocket',
  'game': 'Game Dev', 'game-development': 'Game Dev', 'canvas': 'Canvas', 'webgl': 'WebGL',
  'react-native': 'React Native', 'flutter': 'Flutter', 'ios': 'iOS', 'android': 'Android',
}

const descriptionKeywords: Record<string, string> = {
  'machine learning': 'Machine Learning', 'deep learning': 'Deep Learning', 'neural network': 'Deep Learning',
  'recommendation': 'Recommendation Systems', 'nlp': 'NLP', 'natural language': 'NLP',
  'semantic': 'NLP', 'sbert': 'SBERT', 'sentence-transformers': 'SBERT', 'transformer': 'Transformers',
  'computer vision': 'Computer Vision', 'mediapipe': 'MediaPipe', 'openai': 'OpenAI', 'gpt': 'OpenAI',
  'llm': 'LLM', 'rag': 'RAG', 'langchain': 'LangChain', 'streamlit': 'Streamlit',
  'fastapi': 'FastAPI', 'flask': 'Flask', 'django': 'Django', 'react': 'React', 'next': 'Next.js',
  'vue': 'Vue.js', 'mern': 'MERN Stack', 'mongodb': 'MongoDB', 'express': 'Express', 'node': 'Node.js',
  'docker': 'Docker', 'pandas': 'Pandas', 'numpy': 'NumPy', 'scikit': 'Scikit-learn',
  'tensorflow': 'TensorFlow', 'pytorch': 'PyTorch', 'pwa': 'PWA', 'api': 'REST API',
  'websocket': 'WebSocket', 'real-time': 'Real-time', 'canvas': 'Canvas', 'simulation': 'Simulation', 'game': 'Game Dev',
}

const categorizeSkill = (skill: string): string => {
  const languages = ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'C++', 'C#', 'HTML', 'CSS', 'SCSS', 'SQL', 'PL/SQL', 'Shell', 'Bash', 'PHP', 'R', 'Go', 'Rust', 'Ruby', 'Kotlin', 'Swift', 'Jupyter Notebook']
  const frameworks = ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Node.js', 'Express', 'FastAPI', 'Flask', 'Django', 'Streamlit', '.NET', 'TailwindCSS', 'Bootstrap', 'Three.js', 'anime.js', 'MERN Stack', 'PWA']
  const data = ['Pandas', 'NumPy', 'Jupyter', 'Matplotlib', 'Plotly', 'Seaborn', 'Data Science', 'Data Engineering']
  const ai = ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Hugging Face', 'OpenAI', 'LangChain', 'MediaPipe', 'NLTK', 'spaCy', 'Transformers', 'SBERT', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'AI', 'LLM', 'RAG', 'Chatbot', 'Recommendation Systems']
  const cloud = ['Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab', 'Linux', 'AWS', 'Azure', 'GCP', 'Vercel', 'Netlify', 'Heroku', 'CI/CD', 'GitHub Actions']
  const databases = ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'Business Objects']

  if (languages.includes(skill)) return 'languages'
  if (frameworks.includes(skill)) return 'frameworks'
  if (data.includes(skill)) return 'data'
  if (ai.includes(skill)) return 'ai'
  if (databases.includes(skill)) return 'databases'
  if (cloud.includes(skill)) return 'cloud'
  return 'other'
}

export default function Types() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRepos, setTotalRepos] = useState(0)

  useEffect(() => {
    const CACHE_KEY = 'github-skills'
    const CACHE_DURATION = 1000 * 60 * 30

    async function fetchSkills() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setCategories(addIconsToCategories(data.categories))
            setTotalRepos(data.totalRepos)
            setLoading(false)
            return
          }
        }
      } catch {
        localStorage.removeItem(CACHE_KEY)
      }

      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })

        if (!response.ok) throw new Error('Erreur GitHub API')

        const repos: GitHubRepo[] = await response.json()

        const filteredRepos = repos.filter(repo =>
          !repo.fork &&
          !repo.archived &&
          !['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam'].includes(repo.name)
        )

        setTotalRepos(filteredRepos.length)

        const skillCounts: Record<string, number> = {}

        for (const repo of filteredRepos) {
          if (repo.language) {
            skillCounts[repo.language] = (skillCounts[repo.language] || 0) + 1
          }

          if (repo.topics) {
            for (const topic of repo.topics) {
              const mappedSkill = topicToSkill[topic.toLowerCase()]
              if (mappedSkill) {
                skillCounts[mappedSkill] = (skillCounts[mappedSkill] || 0) + 1
              }
            }
          }

          if (repo.description) {
            const desc = repo.description.toLowerCase()
            for (const [keyword, skill] of Object.entries(descriptionKeywords)) {
              if (desc.includes(keyword)) {
                skillCounts[skill] = (skillCounts[skill] || 0) + 1
              }
            }
          }
        }

        const allStaticSkills = [
          ...staticSkills.languages.map(s => s.name),
          ...staticSkills.frameworks.map(s => s.name),
          ...staticSkills.data.map(s => s.name),
          ...staticSkills.cloud.map(s => s.name),
          ...staticSkills.ai.map(s => s.name),
        ]

        allStaticSkills.forEach(skill => {
          if (!skillCounts[skill]) {
            skillCounts[skill] = 1
          }
        })

        const categorized: Record<string, { name: string; count: number }[]> = {
          languages: [], frameworks: [], data: [], ai: [], databases: [], cloud: [],
        }

        for (const [skill, count] of Object.entries(skillCounts)) {
          const category = categorizeSkill(skill)
          if (category !== 'other') {
            categorized[category].push({ name: skill, count })
          }
        }

        for (const key of Object.keys(categorized)) {
          categorized[key].sort((a, b) => b.count - a.count)
        }

        const cachedCategories: CachedCategory[] = [
          { key: 'languages', title: 'Langages', skills: categorized.languages },
          { key: 'frameworks', title: 'Frameworks & Libraries', skills: categorized.frameworks },
          { key: 'data', title: 'Data & Viz', skills: categorized.data },
          { key: 'ai', title: 'AI / ML / NLP', skills: categorized.ai },
          { key: 'databases', title: 'Databases', skills: categorized.databases },
          { key: 'cloud', title: 'Cloud & DevOps', skills: categorized.cloud },
        ].filter(cat => cat.skills.length > 0)

        setCategories(addIconsToCategories(cachedCategories))

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: { categories: cachedCategories, totalRepos: filteredRepos.length },
            timestamp: Date.now()
          }))
        } catch {}

        setLoading(false)
      } catch (err) {
        console.error('GitHub API error:', err)
        setError('Impossible de charger les compétences depuis GitHub')
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const allSkills = categories.flatMap(cat =>
    cat.skills.map(s => ({ ...s, categoryKey: cat.key }))
  )
  const top10 = [...allSkills].sort((a, b) => b.count - a.count).slice(0, 10)
  const maxCount = top10.length > 0 ? top10[0].count : 1

  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0)

  const langCat = categories.find(c => c.key === 'languages')
  const topLanguage = langCat && langCat.skills.length > 0 ? langCat.skills[0].name : '-'

  if (loading) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--pokedex-white, #F5F5F5)' }}>
          <div className="container-wide">
            <div className="text-center mb-10">
              <div
                className="inline-block h-12 w-48 rounded-lg mb-4"
                style={{
                  background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'pokedex-scan 1.5s infinite',
                }}
              />
              <p
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: 'var(--pokedex-red, #DC0A2D)', fontFamily: 'monospace' }}
              >
                SCANNING...
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 rounded-xl" style={{ background: '#fff', border: '3px solid #e0e0e0' }}>
                  <div className="h-full w-full rounded-xl" style={{
                    background: 'linear-gradient(90deg, #f5f5f5 25%, #fafafa 50%, #f5f5f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'pokedex-scan 1.5s infinite',
                    animationDelay: `${i * 0.1}s`,
                  }} />
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes pokedex-scan {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </main>
      </ErrorBoundary>
    )
  }

  if (error) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--pokedex-white, #F5F5F5)' }}>
          <div className="text-center">
            <p className="mb-4 font-bold" style={{ color: 'var(--pokedex-red, #DC0A2D)' }}>{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{ color: 'var(--pokedex-dark, #333)' }}
            >
              <Github size={18} />
              <span>Voir directement sur GitHub</span>
            </a>
          </div>
        </main>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--pokedex-white, #F5F5F5)', color: 'var(--pokedex-dark, #333)' }}>
        <div className="container-wide">

          {/* Page Header */}
          <div className="text-center mb-10">
            <h1
              className="font-black tracking-wider leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                color: 'var(--pokedex-red, #DC0A2D)',
                textShadow: '2px 2px 0 var(--pokedex-red-dark, #A00020), 4px 4px 0 rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.15em',
              }}
            >
              TYPES
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: '#666', fontFamily: 'monospace' }}
            >
              {totalSkills}+ technologies maîtrisées · {totalRepos} repositories analysés
            </p>
          </div>

          {/* Trainer Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <Code2 size={18} />, label: 'TECHNOLOGIES', value: totalSkills, color: '#A8A878' },
              { icon: <Github size={18} />, label: 'REPOS ANALYSÉS', value: totalRepos, color: '#6890F0' },
              { icon: <TrendingUp size={18} />, label: 'TOP LANGAGE', value: topLanguage, color: '#78C850' },
              { icon: <Award size={18} />, label: 'BADGES LIGUE', value: certifications.length, color: '#F8D030' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: '#fff',
                  border: '3px solid #e0e0e0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#999' }}>
                    {stat.label}
                  </span>
                </div>
                <span className="text-2xl font-black" style={{ fontFamily: 'monospace', color: stat.color }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Skills by Type (Category) */}
          {categories.map((category) => {
            const typeStyle = categoryTypeColors[category.key] || { bg: '#A8A878', text: '#fff', label: 'NORMAL', light: '#C6C6A7' }
            return (
              <section key={category.key} className="mb-8">
                {/* Type Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="type-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: typeStyle.bg, color: typeStyle.text }}
                  >
                    <span style={{ color: typeStyle.text }}>{category.icon}</span>
                    {typeStyle.label}
                  </span>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--pokedex-dark, #333)' }}>
                    {category.title}
                  </h2>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: typeStyle.light, color: typeStyle.text === '#fff' ? '#555' : '#333', fontFamily: 'monospace' }}
                  >
                    {category.skills.length}
                  </span>
                </div>

                {/* Skill Cards with stat bars */}
                <div
                  className="rounded-xl p-4 mb-2"
                  style={{
                    background: '#fff',
                    border: `3px solid ${typeStyle.light}`,
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.skills.map((skill) => {
                      const catMax = category.skills[0]?.count || 1
                      const pct = Math.max(8, (skill.count / catMax) * 100)
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                        >
                          <span
                            className="text-sm font-semibold flex-shrink-0"
                            style={{ width: '110px', color: 'var(--pokedex-dark, #333)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {skill.name}
                          </span>
                          {/* Pokemon stat bar */}
                          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#f0f0f0' }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                background: `linear-gradient(90deg, ${typeStyle.bg}, ${typeStyle.light})`,
                              }}
                            />
                          </div>
                          <span
                            className="text-xs font-bold flex-shrink-0"
                            style={{ width: '24px', textAlign: 'right', fontFamily: 'monospace', color: '#999' }}
                          >
                            {skill.count}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          })}

          {/* EXP Bar Chart - Top 10 Skills */}
          {top10.length > 0 && (
            <section className="mt-10 mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="type-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: 'var(--pokedex-red, #DC0A2D)', color: '#fff' }}
                >
                  <BarChart3 size={14} />
                  EXP
                </span>
                <h2 className="text-lg font-bold" style={{ color: 'var(--pokedex-dark, #333)' }}>
                  Top 10 - Utilisation GitHub
                </h2>
              </div>
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#fff',
                  border: '3px solid #e0e0e0',
                }}
              >
                {top10.map((skill) => {
                  const typeStyle = categoryTypeColors[skill.categoryKey] || { bg: '#A8A878', text: '#fff', label: 'NORMAL', light: '#C6C6A7' }
                  const pct = (skill.count / maxCount) * 100
                  return (
                    <div key={skill.name} className="flex items-center gap-3 mb-3 last:mb-0">
                      <span
                        className="text-sm font-semibold text-right"
                        style={{ width: '130px', flexShrink: 0, color: 'var(--pokedex-dark, #333)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {skill.name}
                      </span>
                      <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: '#f0f0f0' }}>
                        <div
                          className="h-full rounded-full transition-all duration-600 flex items-center justify-end pr-2"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${typeStyle.bg}, ${typeStyle.light})`,
                            minWidth: '30px',
                          }}
                        >
                          <span className="text-[10px] font-bold" style={{ color: typeStyle.text }}>
                            {Math.round(pct)}%
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ width: '36px', flexShrink: 0, fontFamily: 'monospace', color: 'var(--pokedex-dark, #333)' }}
                      >
                        {skill.count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Certifications = Badges de Ligue */}
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="type-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: '#F8D030', color: '#333' }}
              >
                <Award size={14} />
                BADGES
              </span>
              <h2 className="text-lg font-bold" style={{ color: 'var(--pokedex-dark, #333)' }}>
                Badges de Ligue
              </h2>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#FAE078', color: '#333', fontFamily: 'monospace' }}
              >
                {certifications.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: '#fff',
                    border: '3px solid #FAE078',
                    boxShadow: '0 2px 8px rgba(248,208,48,0.15)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: '#FFF8DC', border: '2px solid #F8D030' }}
                    >
                      <Award size={18} style={{ color: '#DAA520' }} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-bold leading-tight line-clamp-2"
                        style={{ color: 'var(--pokedex-dark, #333)' }}
                      >
                        {cert.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#999' }}>
                        {cert.issuer}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'monospace' }}>
                        {cert.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </ErrorBoundary>
  )
}
