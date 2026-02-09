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

// Category colors matching Netflix palette
const categoryColors: Record<string, string> = {
  languages: '#3B82F6',
  frameworks: '#8B5CF6',
  data: '#10B981',
  ai: '#EC4899',
  databases: '#10B981',
  cloud: '#F97316',
}

// Icon map for categories
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

// Topic mapping
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

export default function Competences() {
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

  // Gather all skills across categories for the bar chart
  const allSkills = categories.flatMap(cat =>
    cat.skills.map(s => ({ ...s, categoryKey: cat.key }))
  )
  const top10 = [...allSkills].sort((a, b) => b.count - a.count).slice(0, 10)
  const maxCount = top10.length > 0 ? top10[0].count : 1

  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0)

  // Find top language
  const langCat = categories.find(c => c.key === 'languages')
  const topLanguage = langCat && langCat.skills.length > 0 ? langCat.skills[0].name : '-'

  if (loading) {
    return (
      <ErrorBoundary>
        <main style={{ background: '#141414', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>
          <div className="container-wide">
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ height: 16, width: 160, background: '#2a2a2a', borderRadius: 4, marginBottom: 16 }} className="animate-pulse" />
              <div style={{ height: 48, width: 280, background: '#2a2a2a', borderRadius: 4, marginBottom: 24 }} className="animate-pulse" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: 100, background: '#1a1a1a', borderRadius: 8 }} className="animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </ErrorBoundary>
    )
  }

  if (error) {
    return (
      <ErrorBoundary>
        <main style={{ background: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#e50914', marginBottom: 16 }}>{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e50914', display: 'inline-flex', alignItems: 'center', gap: 8 }}
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
      <style>{`
        :root {
          --bg-deep: #141414;
          --bg-surface: #1a1a1a;
          --bg-elevated: #222;
          --accent: #e50914;
          --text-primary: #fff;
          --text-secondary: #b3b3b3;
          --text-muted: #808080;
          --border: #333;
        }
        .nfx-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px 24px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .nfx-stat-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }
        .nfx-row-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 12px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .nfx-row-scroll::-webkit-scrollbar { height: 4px; }
        .nfx-row-scroll::-webkit-scrollbar-track { background: transparent; }
        .nfx-row-scroll::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
        .nfx-skill-card {
          flex: 0 0 180px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          cursor: default;
        }
        .nfx-skill-card:hover {
          transform: scale(1.05);
        }
        .nfx-cert-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .nfx-cert-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }
        .nfx-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .nfx-bar-label {
          width: 130px;
          flex-shrink: 0;
          font-size: 14px;
          color: var(--text-secondary);
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nfx-bar-track {
          flex: 1;
          height: 24px;
          background: var(--bg-elevated);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .nfx-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }
        .nfx-bar-count {
          width: 36px;
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          font-family: monospace;
        }
        @media (max-width: 768px) {
          .nfx-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nfx-skill-card { flex: 0 0 150px; }
          .nfx-cert-grid { grid-template-columns: 1fr !important; }
          .nfx-bar-label { width: 90px; font-size: 12px; }
        }
        @media (max-width: 480px) {
          .nfx-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ background: 'var(--bg-deep)', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem', color: 'var(--text-primary)' }}>
        <div className="container-wide">

          {/* Page Header */}
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
              Compétences
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: 12, maxWidth: 600 }}>
              {totalSkills}+ technologies maîtrisées · Données extraites en temps réel de {totalRepos} repositories GitHub.
            </p>
          </div>

          {/* Stats Overview - 4 cards */}
          <div className="nfx-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: '3rem' }}>
            <div className="nfx-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Code2 size={18} style={{ color: '#3B82F6' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Technologies</span>
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{totalSkills}</span>
            </div>
            <div className="nfx-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Github size={18} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Repos analysés</span>
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{totalRepos}</span>
            </div>
            <div className="nfx-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <TrendingUp size={18} style={{ color: '#10B981' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top langage</span>
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{topLanguage}</span>
            </div>
            <div className="nfx-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Award size={18} style={{ color: '#F97316' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certifications</span>
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{certifications.length}</span>
            </div>
          </div>

          {/* Skills by Category - Netflix rows */}
          {categories.map((category) => {
            const color = categoryColors[category.key] || '#e50914'
            return (
              <section key={category.key} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ color }}>{category.icon}</span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>{category.title}</h2>
                  <span style={{
                    fontSize: 12, fontFamily: 'monospace', color, background: `${color}22`,
                    padding: '2px 8px', borderRadius: 12, marginLeft: 8,
                  }}>
                    {category.skills.length}
                  </span>
                </div>
                <div className="nfx-row-scroll">
                  {category.skills.map((skill) => {
                    const catMax = category.skills[0]?.count || 1
                    const pct = Math.max(10, (skill.count / catMax) * 100)
                    return (
                      <div
                        key={skill.name}
                        className="nfx-skill-card"
                        style={{
                          ['--glow-color' as string]: color,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}44, 0 4px 12px rgba(0,0,0,0.5)`
                          ;(e.currentTarget as HTMLElement).style.borderColor = color
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                        }}
                      >
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {skill.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
                          {skill.count} projet{skill.count > 1 ? 's' : ''}
                        </div>
                        <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{
                            width: `${pct}%`,
                            height: '100%',
                            borderRadius: 2,
                            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                            transition: 'width 0.4s ease',
                          }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}

          {/* Bar Chart - Top 10 Skills */}
          {top10.length > 0 && (
            <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <BarChart3 size={20} style={{ color: 'var(--accent)' }} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Top 10 - Utilisation GitHub</h2>
              </div>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '24px 24px 14px' }}>
                {top10.map((skill) => {
                  const color = categoryColors[skill.categoryKey] || '#e50914'
                  const pct = (skill.count / maxCount) * 100
                  return (
                    <div key={skill.name} className="nfx-bar-row">
                      <span className="nfx-bar-label">{skill.name}</span>
                      <div className="nfx-bar-track">
                        <div
                          className="nfx-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                          }}
                        />
                      </div>
                      <span className="nfx-bar-count">{skill.count}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Certifications */}
          <section style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Award size={20} style={{ color: '#F97316' }} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Certifications</h2>
              <span style={{
                fontSize: 12, fontFamily: 'monospace', color: '#F97316', background: 'rgba(249,115,22,0.13)',
                padding: '2px 8px', borderRadius: 12, marginLeft: 8,
              }}>
                {certifications.length}
              </span>
            </div>
            <div className="nfx-cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {certifications.map((cert) => (
                <div key={cert.name} className="nfx-cert-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Award size={18} style={{ color: '#F97316' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {cert.name}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>{cert.issuer}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0', fontFamily: 'monospace' }}>{cert.year}</p>
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
