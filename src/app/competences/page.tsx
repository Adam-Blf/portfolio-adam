'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import { Github, Code2, Database, Cloud, Brain, Blocks, Server, GitCommit, ArrowUpRight, Mail } from 'lucide-react'
import { skills as staticSkills, certifications, personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'

const SpaceBackground = dynamic(
  () => import('@/components/three/SpaceBackground').catch(() => {
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[#050508]" />,
  }
)

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

// Category configuration with icons and colors
const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bgLight: string; bgDark: string }> = {
  languages: {
    icon: <Code2 size={18} />,
    color: '#3B82F6', // Blue
    bgLight: 'rgba(59, 130, 246, 0.08)',
    bgDark: 'rgba(59, 130, 246, 0.15)'
  },
  frameworks: {
    icon: <Blocks size={18} />,
    color: '#8B5CF6', // Purple
    bgLight: 'rgba(139, 92, 246, 0.08)',
    bgDark: 'rgba(139, 92, 246, 0.15)'
  },
  data: {
    icon: <Database size={18} />,
    color: '#10B981', // Green
    bgLight: 'rgba(16, 185, 129, 0.08)',
    bgDark: 'rgba(16, 185, 129, 0.15)'
  },
  ai: {
    icon: <Brain size={18} />,
    color: '#F59E0B', // Amber
    bgLight: 'rgba(245, 158, 11, 0.08)',
    bgDark: 'rgba(245, 158, 11, 0.15)'
  },
  databases: {
    icon: <Server size={18} />,
    color: '#EF4444', // Red
    bgLight: 'rgba(239, 68, 68, 0.08)',
    bgDark: 'rgba(239, 68, 68, 0.15)'
  },
  cloud: {
    icon: <Cloud size={18} />,
    color: '#06B6D4', // Cyan
    bgLight: 'rgba(6, 182, 212, 0.08)',
    bgDark: 'rgba(6, 182, 212, 0.15)'
  },
}

// Icon map for categories (must be outside component to avoid recreation)
const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 size={18} />,
  frameworks: <Blocks size={18} />,
  data: <Database size={18} />,
  ai: <Brain size={18} />,
  databases: <Server size={18} />,
  cloud: <Cloud size={18} />,
}

// Add icons to cached categories
const addIconsToCategories = (cached: CachedCategory[]): SkillCategory[] => {
  return cached.map(cat => ({
    ...cat,
    icon: categoryIcons[cat.key] || <Code2 size={18} />,
  }))
}

// Extended badge config for shields.io
const skillBadges: Record<string, { logo: string; color: string; logoColor?: string }> = {
  // Languages
  'Python': { logo: 'python', color: '3776AB' },
  'TypeScript': { logo: 'typescript', color: '3178C6' },
  'JavaScript': { logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
  'Java': { logo: 'openjdk', color: 'ED8B00' },
  'C': { logo: 'c', color: 'A8B9CC', logoColor: 'black' },
  'C++': { logo: 'cplusplus', color: '00599C' },
  'C#': { logo: 'csharp', color: '512BD4' },
  'HTML': { logo: 'html5', color: 'E34F26' },
  'CSS': { logo: 'css3', color: '1572B6' },
  'SCSS': { logo: 'sass', color: 'CC6699' },
  'SQL': { logo: 'postgresql', color: '4169E1' },
  'PL/SQL': { logo: 'oracle', color: 'F80000' },
  'Shell': { logo: 'gnubash', color: '4EAA25' },
  'Bash': { logo: 'gnubash', color: '4EAA25' },
  'PHP': { logo: 'php', color: '777BB4' },
  'R': { logo: 'r', color: '276DC3' },
  'Go': { logo: 'go', color: '00ADD8' },
  'Rust': { logo: 'rust', color: '000000' },
  'Ruby': { logo: 'ruby', color: 'CC342D' },
  'Kotlin': { logo: 'kotlin', color: '7F52FF' },
  'Swift': { logo: 'swift', color: 'F05138' },
  'Jupyter Notebook': { logo: 'jupyter', color: 'F37626' },
  // Frameworks & Libraries
  'React': { logo: 'react', color: '61DAFB', logoColor: 'black' },
  'Next.js': { logo: 'nextdotjs', color: '000000' },
  'Vue.js': { logo: 'vuedotjs', color: '4FC08D' },
  'Angular': { logo: 'angular', color: 'DD0031' },
  'Svelte': { logo: 'svelte', color: 'FF3E00' },
  'Node.js': { logo: 'nodedotjs', color: '339933' },
  'Express': { logo: 'express', color: '000000' },
  'FastAPI': { logo: 'fastapi', color: '009688' },
  'Flask': { logo: 'flask', color: '000000' },
  'Django': { logo: 'django', color: '092E20' },
  'Streamlit': { logo: 'streamlit', color: 'FF4B4B' },
  '.NET': { logo: 'dotnet', color: '512BD4' },
  'TailwindCSS': { logo: 'tailwindcss', color: '06B6D4' },
  'Bootstrap': { logo: 'bootstrap', color: '7952B3' },
  'Three.js': { logo: 'threedotjs', color: '000000' },
  'anime.js': { logo: 'javascript', color: 'FF6F00' },
  // Data & ML
  'TensorFlow': { logo: 'tensorflow', color: 'FF6F00' },
  'PyTorch': { logo: 'pytorch', color: 'EE4C2C' },
  'Keras': { logo: 'keras', color: 'D00000' },
  'Pandas': { logo: 'pandas', color: '150458' },
  'NumPy': { logo: 'numpy', color: '013243' },
  'Scikit-learn': { logo: 'scikitlearn', color: 'F7931E' },
  'Hugging Face': { logo: 'huggingface', color: 'FFD21E', logoColor: 'black' },
  'OpenAI': { logo: 'openai', color: '412991' },
  'LangChain': { logo: 'chainlink', color: '375BD2' },
  'Matplotlib': { logo: 'plotly', color: '3F4F75' },
  'Plotly': { logo: 'plotly', color: '3F4F75' },
  'Seaborn': { logo: 'python', color: '3776AB' },
  'MediaPipe': { logo: 'google', color: '4285F4' },
  'NLTK': { logo: 'python', color: '3776AB' },
  'spaCy': { logo: 'spacy', color: '09A3D5' },
  'Transformers': { logo: 'huggingface', color: 'FFD21E', logoColor: 'black' },
  'SBERT': { logo: 'huggingface', color: 'FFD21E', logoColor: 'black' },
  // Cloud & DevOps
  'Docker': { logo: 'docker', color: '2496ED' },
  'Kubernetes': { logo: 'kubernetes', color: '326CE5' },
  'Git': { logo: 'git', color: 'F05032' },
  'GitHub': { logo: 'github', color: '181717' },
  'GitLab': { logo: 'gitlab', color: 'FC6D26' },
  'Linux': { logo: 'linux', color: 'FCC624', logoColor: 'black' },
  'AWS': { logo: 'amazonwebservices', color: '232F3E' },
  'Azure': { logo: 'microsoftazure', color: '0078D4' },
  'GCP': { logo: 'googlecloud', color: '4285F4' },
  'Vercel': { logo: 'vercel', color: '000000' },
  'Netlify': { logo: 'netlify', color: '00C7B7' },
  'Heroku': { logo: 'heroku', color: '430098' },
  'CI/CD': { logo: 'githubactions', color: '2088FF' },
  'GitHub Actions': { logo: 'githubactions', color: '2088FF' },
  // Databases
  'Oracle': { logo: 'oracle', color: 'F80000' },
  'PostgreSQL': { logo: 'postgresql', color: '4169E1' },
  'MySQL': { logo: 'mysql', color: '4479A1' },
  'MongoDB': { logo: 'mongodb', color: '47A248' },
  'Redis': { logo: 'redis', color: 'DC382D' },
  'SQLite': { logo: 'sqlite', color: '003B57' },
  'Firebase': { logo: 'firebase', color: 'FFCA28', logoColor: 'black' },
  'Supabase': { logo: 'supabase', color: '3ECF8E' },
  // Tools
  'Jupyter': { logo: 'jupyter', color: 'F37626' },
  'VS Code': { logo: 'visualstudiocode', color: '007ACC' },
  'Figma': { logo: 'figma', color: 'F24E1E' },
  'Postman': { logo: 'postman', color: 'FF6C37' },
  'Notion': { logo: 'notion', color: '000000' },
  'Jira': { logo: 'jira', color: '0052CC' },
  'Confluence': { logo: 'confluence', color: '172B4D' },
  'Business Objects': { logo: 'sap', color: '0FAAFF' },
  // Additional AI/ML
  'Machine Learning': { logo: 'scikitlearn', color: 'F7931E' },
  'Deep Learning': { logo: 'pytorch', color: 'EE4C2C' },
  'NLP': { logo: 'spacy', color: '09A3D5' },
  'Computer Vision': { logo: 'opencv', color: '5C3EE8' },
  'AI': { logo: 'openai', color: '412991' },
  'LLM': { logo: 'openai', color: '412991' },
  'RAG': { logo: 'langchain', color: '1C3C3C' },
  'Chatbot': { logo: 'dialogflow', color: 'FF9800' },
  'Recommendation Systems': { logo: 'tensorflow', color: 'FF6F00' },
  // Data concepts
  'Data Science': { logo: 'anaconda', color: '44A833' },
  'Data Engineering': { logo: 'apacheairflow', color: '017CEE' },
  // Web concepts
  'REST API': { logo: 'fastapi', color: '009688' },
  'GraphQL': { logo: 'graphql', color: 'E10098' },
  'WebSocket': { logo: 'socketdotio', color: '010101' },
  'PWA': { logo: 'pwa', color: '5A0FC8' },
  // Mobile
  'React Native': { logo: 'react', color: '61DAFB', logoColor: 'black' },
  'Flutter': { logo: 'flutter', color: '02569B' },
  // Game/Graphics
  'Game Dev': { logo: 'unity', color: '000000' },
  'Canvas': { logo: 'html5', color: 'E34F26' },
  'WebGL': { logo: 'webgl', color: '990000' },
}

// Extended topic mapping
const topicToSkill: Record<string, string> = {
  // Frameworks
  'react': 'React',
  'reactjs': 'React',
  'nextjs': 'Next.js',
  'next-js': 'Next.js',
  'next': 'Next.js',
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'angular': 'Angular',
  'svelte': 'Svelte',
  'nodejs': 'Node.js',
  'node-js': 'Node.js',
  'node': 'Node.js',
  'express': 'Express',
  'expressjs': 'Express',
  'fastapi': 'FastAPI',
  'flask': 'Flask',
  'django': 'Django',
  'streamlit': 'Streamlit',
  'dotnet': '.NET',
  'tailwindcss': 'TailwindCSS',
  'tailwind': 'TailwindCSS',
  'bootstrap': 'Bootstrap',
  'threejs': 'Three.js',
  'three-js': 'Three.js',
  // Data & ML
  'tensorflow': 'TensorFlow',
  'pytorch': 'PyTorch',
  'keras': 'Keras',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'scikit-learn': 'Scikit-learn',
  'sklearn': 'Scikit-learn',
  'huggingface': 'Hugging Face',
  'transformers': 'Transformers',
  'openai': 'OpenAI',
  'langchain': 'LangChain',
  'matplotlib': 'Matplotlib',
  'plotly': 'Plotly',
  'seaborn': 'Seaborn',
  'mediapipe': 'MediaPipe',
  'nltk': 'NLTK',
  'spacy': 'spaCy',
  'sbert': 'SBERT',
  'sentence-transformers': 'SBERT',
  // Concepts
  'machine-learning': 'Machine Learning',
  'deep-learning': 'Deep Learning',
  'nlp': 'NLP',
  'natural-language-processing': 'NLP',
  'computer-vision': 'Computer Vision',
  'data-science': 'Data Science',
  'data-engineering': 'Data Engineering',
  'artificial-intelligence': 'AI',
  'ai': 'AI',
  'ml': 'Machine Learning',
  'llm': 'LLM',
  'rag': 'RAG',
  'chatbot': 'Chatbot',
  'recommendation': 'Recommendation Systems',
  // Cloud & DevOps
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'git': 'Git',
  'github': 'GitHub',
  'gitlab': 'GitLab',
  'linux': 'Linux',
  'aws': 'AWS',
  'azure': 'Azure',
  'gcp': 'GCP',
  'vercel': 'Vercel',
  'netlify': 'Netlify',
  'heroku': 'Heroku',
  'ci-cd': 'CI/CD',
  'github-actions': 'GitHub Actions',
  // Databases
  'oracle': 'Oracle',
  'postgresql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'mysql': 'MySQL',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'redis': 'Redis',
  'sqlite': 'SQLite',
  'firebase': 'Firebase',
  'supabase': 'Supabase',
  // PWA & Web
  'pwa': 'PWA',
  'progressive-web-app': 'PWA',
  'api': 'REST API',
  'rest': 'REST API',
  'graphql': 'GraphQL',
  'websocket': 'WebSocket',
  // Games & Graphics
  'game': 'Game Dev',
  'game-development': 'Game Dev',
  'canvas': 'Canvas',
  'webgl': 'WebGL',
  // Mobile
  'react-native': 'React Native',
  'flutter': 'Flutter',
  'ios': 'iOS',
  'android': 'Android',
}

// Description keywords to skill mapping
const descriptionKeywords: Record<string, string> = {
  'machine learning': 'Machine Learning',
  'deep learning': 'Deep Learning',
  'neural network': 'Deep Learning',
  'recommendation': 'Recommendation Systems',
  'nlp': 'NLP',
  'natural language': 'NLP',
  'semantic': 'NLP',
  'sbert': 'SBERT',
  'sentence-transformers': 'SBERT',
  'transformer': 'Transformers',
  'computer vision': 'Computer Vision',
  'mediapipe': 'MediaPipe',
  'openai': 'OpenAI',
  'gpt': 'OpenAI',
  'llm': 'LLM',
  'rag': 'RAG',
  'langchain': 'LangChain',
  'streamlit': 'Streamlit',
  'fastapi': 'FastAPI',
  'flask': 'Flask',
  'django': 'Django',
  'react': 'React',
  'next': 'Next.js',
  'vue': 'Vue.js',
  'mern': 'MERN Stack',
  'mongodb': 'MongoDB',
  'express': 'Express',
  'node': 'Node.js',
  'docker': 'Docker',
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'scikit': 'Scikit-learn',
  'tensorflow': 'TensorFlow',
  'pytorch': 'PyTorch',
  'pwa': 'PWA',
  'api': 'REST API',
  'websocket': 'WebSocket',
  'real-time': 'Real-time',
  'canvas': 'Canvas',
  'simulation': 'Simulation',
  'game': 'Game Dev',
}

// Categorize skills
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

// Generate shields.io badge URL
const getBadgeUrl = (name: string) => {
  const badge = skillBadges[name]
  if (!badge) return null
  const displayName = name.replace(/\//g, '%2F').replace(/ /g, '%20').replace(/\+/g, '%2B').replace(/#/g, '%23')
  const logoColor = badge.logoColor || 'white'
  return `https://img.shields.io/badge/${displayName}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=${logoColor}`
}

export default function Competences() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRepos, setTotalRepos] = useState(0)
  const [totalCommits, setTotalCommits] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const CACHE_KEY = 'github-skills'
    const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

    async function fetchSkills() {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            // Add icons back to cached categories (icons can't be serialized)
            setCategories(addIconsToCategories(data.categories))
            setTotalRepos(data.totalRepos)
            setTotalCommits(data.totalCommits || 0)
            setLoading(false)
            return
          }
        }
      } catch (e) {
        // Cache read failed, clear corrupted cache
        localStorage.removeItem(CACHE_KEY)
      }

      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })

        if (!response.ok) throw new Error('Erreur GitHub API')

        const repos: GitHubRepo[] = await response.json()

        // Filter repos
        const filteredRepos = repos.filter(repo =>
          !repo.fork &&
          !repo.archived &&
          !['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam'].includes(repo.name)
        )

        setTotalRepos(filteredRepos.length)

        // Aggregate skills
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

          // Analyze description for keywords
          if (repo.description) {
            const desc = repo.description.toLowerCase()
            for (const [keyword, skill] of Object.entries(descriptionKeywords)) {
              if (desc.includes(keyword)) {
                skillCounts[skill] = (skillCounts[skill] || 0) + 1
              }
            }
          }
        }

        // Add static skills from data.ts with minimum counts
        const allStaticSkills = [
          ...staticSkills.languages.map(s => s.name),
          ...staticSkills.frameworks.map(s => s.name),
          ...staticSkills.data.map(s => s.name),
          ...staticSkills.cloud.map(s => s.name),
          ...staticSkills.ai.map(s => s.name),
        ]

        allStaticSkills.forEach(skill => {
          if (!skillCounts[skill]) {
            skillCounts[skill] = 1 // At least 1 mention for known skills
          }
        })

        // Organize into categories
        const categorized: Record<string, { name: string; count: number }[]> = {
          languages: [],
          frameworks: [],
          data: [],
          ai: [],
          databases: [],
          cloud: [],
        }

        for (const [skill, count] of Object.entries(skillCounts)) {
          const category = categorizeSkill(skill)
          if (category !== 'other') {
            categorized[category].push({ name: skill, count })
          }
        }

        // Sort by count
        for (const key of Object.keys(categorized)) {
          categorized[key].sort((a, b) => b.count - a.count)
        }

        // Build final categories (without icons for caching)
        const cachedCategories: CachedCategory[] = [
          { key: 'languages', title: 'Langages', skills: categorized.languages },
          { key: 'frameworks', title: 'Frameworks & Libraries', skills: categorized.frameworks },
          { key: 'data', title: 'Data & Viz', skills: categorized.data },
          { key: 'ai', title: 'AI / ML / NLP', skills: categorized.ai },
          { key: 'databases', title: 'Databases', skills: categorized.databases },
          { key: 'cloud', title: 'Cloud & DevOps', skills: categorized.cloud },
        ].filter(cat => cat.skills.length > 0)

        // Add icons for display
        setCategories(addIconsToCategories(cachedCategories))

        // Estimate commits
        let commits = 0
        const topRepos = filteredRepos.slice(0, 10)
        await Promise.all(
          topRepos.map(async (repo) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/Adam-Blf/${repo.name}/contributors?per_page=1`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
              )
              if (res.ok) {
                const contributors = await res.json()
                if (Array.isArray(contributors)) {
                  commits += contributors.reduce((s: number, c: any) => s + (c.contributions || 0), 0)
                }
              }
            } catch {}
          })
        )
        const avgPerRepo = topRepos.length > 0 ? commits / topRepos.length : 15
        const estimatedCommits = Math.round(avgPerRepo * filteredRepos.length)
        setTotalCommits(estimatedCommits)

        // Cache (store only serializable data without React elements)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: { categories: cachedCategories, totalRepos: filteredRepos.length, totalCommits: estimatedCommits },
            timestamp: Date.now()
          }))
        } catch {}

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
      const elements = header.querySelectorAll('[data-animate]')
      animate(elements, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        delay: stagger(100),
      })
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
        <ErrorBoundary><SpaceBackground variant="dense" /></ErrorBoundary>
        <main className="pt-32 pb-24">
          <div className="container-wide">
            <div className="layout-offset mb-16">
              <div className="h-4 w-40 bg-[--bg-elevated] rounded animate-pulse mb-4" />
              <div className="h-12 w-56 bg-[--bg-elevated] rounded animate-pulse mb-6" />
              <div className="h-6 w-80 bg-[--bg-elevated] rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[--bg-surface] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-6 bg-[--bg-elevated] rounded animate-pulse" />
                    <div className="h-5 w-32 bg-[--bg-elevated] rounded animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-7 w-20 bg-[--bg-elevated] rounded animate-pulse" />
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
        <ErrorBoundary><SpaceBackground variant="dense" /></ErrorBoundary>
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
      <ErrorBoundary><SpaceBackground variant="dense" /></ErrorBoundary>
      <main className="pt-32 pb-24">
        <div className="container-wide">

          {/* Header */}
          <div ref={headerRef} className="layout-offset mb-20">
            <p data-animate className="page-caption text-caption mb-4" style={{ opacity: 0 }}>Stack Technique</p>
            <h1 data-animate className="page-title text-display mb-6" style={{ opacity: 0 }}>Competences</h1>
            <p data-animate className="page-description text-body max-w-xl mb-8" style={{ opacity: 0 }}>
              {totalSkills}+ technologies maitrisees dans {totalRepos}+ projets GitHub.
              Donnees en temps reel extraites de mes repositories.
            </p>

            {/* Stats row */}
            <div data-animate className="flex flex-wrap items-center gap-6" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-sm text-[--text-secondary]">
                <Github size={16} className="text-accent" />
                <span className="font-mono font-semibold">{totalRepos}+</span>
                <span>projets</span>
              </div>
              {totalCommits > 0 && (
                <div className="flex items-center gap-2 text-sm text-[--text-secondary]">
                  <GitCommit size={16} className="text-accent" />
                  <span className="font-mono font-semibold">{totalCommits}+</span>
                  <span>commits</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[--text-secondary]">
                <Code2 size={16} className="text-accent" />
                <span className="font-mono font-semibold">{totalSkills}+</span>
                <span>technologies</span>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <section ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const config = categoryConfig[category.key]
              return (
              <div
                key={category.key}
                className="skill-category rounded-xl p-6 border transition-all hover:shadow-lg"
                style={{
                  opacity: 0,
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: config?.color || 'var(--border)',
                  borderLeftWidth: '4px',
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: config?.bgLight || 'var(--bg-elevated)' }}
                  >
                    <span style={{ color: config?.color || 'var(--accent)' }}>{category.icon}</span>
                  </div>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                  <span
                    className="text-xs ml-auto font-mono px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: config?.bgLight || 'var(--bg-elevated)',
                      color: config?.color || 'var(--text-muted)'
                    }}
                  >
                    {category.skills.length}
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
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[--bg-elevated] text-xs px-2 py-1 rounded opacity-0 group-hover/skill:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          {skill.count} projet{skill.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <span
                        key={skill.name}
                        className="tag hover:border-accent transition-colors cursor-default"
                        style={{ borderColor: config?.color || undefined }}
                        title={`${skill.count} projet${skill.count > 1 ? 's' : ''}`}
                      >
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </div>
              )
            })}
          </section>

          {/* Certifications */}
          <section className="mt-16 pt-16 border-t border-[--border]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-title">Certifications</h2>
              <span className="text-accent font-mono">{certifications.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.slice(0, 6).map((cert) => (
                <div key={cert.name} className="flex items-start gap-3 p-4 bg-[--bg-surface] border border-[--border]">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs font-mono">{cert.year.slice(-2)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm line-clamp-1">{cert.name}</p>
                    <p className="text-xs text-[--text-muted]">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 mt-12 border-t border-[--border]">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-caption mb-4">Intéressé ?</p>
              <h2 className="text-headline mb-6">
                Ces compétences au service de <span className="accent-line">votre projet</span>
              </h2>
              <p className="text-body-lg text-[--text-secondary] mb-10">
                Data Engineering, IA, Fullstack — discutons de comment je peux contribuer à vos ambitions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="btn btn-primary group">
                  <Mail size={16} />
                  Me contacter
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Github size={16} />
                  Voir mes projets
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
