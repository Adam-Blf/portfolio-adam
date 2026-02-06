// GitHub API Service
// Fetches repositories from GitHub API

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  fork: boolean
  archived: boolean
}

export interface ProcessedProject {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  stars: number
  forks: number
}

// Map of language to category
const languageCategories: Record<string, string> = {
  'Python': 'IA / Machine Learning',
  'TypeScript': 'Fullstack / Web',
  'JavaScript': 'Fullstack / Web',
  'HTML': 'Fullstack / Web',
  'CSS': 'Fullstack / Web',
  'C#': 'Autres',
  'Java': 'Autres',
  'C': 'Autres',
  'C++': 'Autres',
}

// Projects to highlight (manual curation)
const featuredProjects = [
  'ia-pero',
  'ia-pero-final',
  'LLM-Council',
  'genius',
  'Echo',
  'A.B.E.L',
  'AISCA-Cocktails',
  'Taskmate',
  'Langue-des-signes',
  'EFREI-NLP-Anime-Recommendation',
  'Borderland',
  'WalkingAI',
  'Blackjack-Simulator',
  'TP-Social-Media',
]

// Projects to exclude (forks, config repos, etc)
const excludedProjects = [
  'Adam-Blf', // Profile README
  'portfolio', // Old portfolio
  'Logo',
  'Keep-Alive',
]

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'Adam-Blf'

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      console.error('GitHub API error:', response.status)
      return []
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter out excluded and forked repos
    return repos.filter(repo =>
      !excludedProjects.includes(repo.name) &&
      !repo.fork &&
      !repo.archived
    )
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export function processReposToProjects(repos: GitHubRepo[]): Record<string, ProcessedProject[]> {
  const categories: Record<string, ProcessedProject[]> = {
    'IA / Machine Learning': [],
    'Fullstack / Web': [],
    'Autres': [],
  }

  // Sort: featured first, then by update date
  const sortedRepos = [...repos].sort((a, b) => {
    const aFeatured = featuredProjects.includes(a.name) ? 1 : 0
    const bFeatured = featuredProjects.includes(b.name) ? 1 : 0
    if (aFeatured !== bFeatured) return bFeatured - aFeatured
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  })

  for (const repo of sortedRepos) {
    const category = languageCategories[repo.language || ''] || 'Autres'

    // Determine tags from topics and language
    const tags: string[] = []
    if (repo.language) tags.push(repo.language)
    if (repo.topics) tags.push(...repo.topics.slice(0, 4))

    const project: ProcessedProject = {
      name: repo.name,
      desc: repo.description || `Projet ${repo.language || 'personnel'}`,
      lang: repo.language || 'Multi',
      tags: tags.length > 0 ? tags : ['Code'],
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }

    // Special categorization based on project name/description
    const lowerName = repo.name.toLowerCase()
    const lowerDesc = (repo.description || '').toLowerCase()

    if (
      lowerName.includes('ia') ||
      lowerName.includes('ai') ||
      lowerName.includes('ml') ||
      lowerName.includes('nlp') ||
      lowerName.includes('llm') ||
      lowerDesc.includes('machine learning') ||
      lowerDesc.includes('deep learning') ||
      lowerDesc.includes('neural') ||
      lowerDesc.includes('nlp') ||
      lowerDesc.includes('sbert') ||
      lowerDesc.includes('semantic')
    ) {
      categories['IA / Machine Learning'].push(project)
    } else if (
      repo.language === 'TypeScript' ||
      repo.language === 'JavaScript' ||
      repo.language === 'HTML' ||
      repo.language === 'CSS' ||
      lowerDesc.includes('pwa') ||
      lowerDesc.includes('web') ||
      lowerDesc.includes('app')
    ) {
      categories['Fullstack / Web'].push(project)
    } else {
      categories[category].push(project)
    }
  }

  // Remove empty categories
  return Object.fromEntries(
    Object.entries(categories).filter(([_, projects]) => projects.length > 0)
  )
}

// Static fallback data (used if API fails)
export const fallbackProjects = {
  'IA / Machine Learning': [
    { name: 'ia-pero', desc: 'Semantic similarity explorer with Streamlit and Sentence-Transformers', lang: 'Python', tags: ['Python', 'NLP', 'SBERT', 'Streamlit'], url: 'https://github.com/Adam-Blf/ia-pero', stars: 0, forks: 0 },
    { name: 'LLM-Council', desc: '3-stage LLM deliberation system with anonymized peer review', lang: 'Python', tags: ['Python', 'LLM', 'AI'], url: 'https://github.com/Adam-Blf/LLM-Council', stars: 0, forks: 0 },
    { name: 'AISCA-Cocktails', desc: 'Cocktail recommendation with SBERT semantic search and RAG - EFREI Project', lang: 'Python', tags: ['Python', 'RAG', 'SBERT', 'NLP'], url: 'https://github.com/Adam-Blf/AISCA-Cocktails', stars: 0, forks: 0 },
    { name: 'EFREI-NLP-Anime-Recommendation', desc: 'Moteur de recommandation NLP avec TF-IDF et Cosine Similarity', lang: 'Python', tags: ['Python', 'NLP', 'TF-IDF'], url: 'https://github.com/Adam-Blf/EFREI-NLP-Anime-Recommendation', stars: 0, forks: 0 },
    { name: 'Langue-des-signes', desc: 'Apprentissage langue des signes par IA avec MediaPipe et Deep Learning', lang: 'Python', tags: ['Python', 'Computer Vision', 'MediaPipe', 'Deep Learning'], url: 'https://github.com/Adam-Blf/Langue-des-signes', stars: 0, forks: 0 },
    { name: 'WalkingAI', desc: 'Simulation IA apprenant a marcher - Reinforcement Learning', lang: 'HTML', tags: ['Reinforcement Learning', 'Simulation'], url: 'https://github.com/Adam-Blf/WalkingAI', stars: 0, forks: 0 },
    { name: 'Projet-IA-Generative-Doctis-AI-mo', desc: 'Projet IA Generative pour Doctis', lang: 'Python', tags: ['Python', 'Generative AI'], url: 'https://github.com/Adam-Blf/Projet-IA-Generative-Doctis-AI-mo', stars: 0, forks: 0 },
    { name: 'RobotArtist', desc: 'Generation artistique par robot/IA', lang: 'Python', tags: ['Python', 'Art', 'AI'], url: 'https://github.com/Adam-Blf/RobotArtist', stars: 0, forks: 0 },
    { name: 'Blackjack-Simulator', desc: 'Blackjack simulator with 5 AI strategies, card counting and statistics', lang: 'Python', tags: ['Python', 'Simulation', 'AI', 'Statistics'], url: 'https://github.com/Adam-Blf/Blackjack-Simulator', stars: 0, forks: 0 },
  ],
  'Fullstack / Web': [
    { name: 'genius', desc: 'PWA de micro-learning gamifie - Apprends en swipant', lang: 'TypeScript', tags: ['TypeScript', 'PWA', 'Gamification'], url: 'https://github.com/Adam-Blf/genius', stars: 0, forks: 0 },
    { name: 'Echo', desc: 'PWA Dating App - Dating reinvented with real-time authenticity', lang: 'TypeScript', tags: ['TypeScript', 'PWA', 'Real-time'], url: 'https://github.com/Adam-Blf/Echo', stars: 0, forks: 0 },
    { name: 'A.B.E.L', desc: 'Assistant Personnel PWA - Adam Beloucif Est La', lang: 'TypeScript', tags: ['TypeScript', 'PWA', 'Assistant'], url: 'https://github.com/Adam-Blf/A.B.E.L', stars: 0, forks: 0 },
    { name: 'Borderland', desc: 'Borderland - Card Game App', lang: 'TypeScript', tags: ['TypeScript', 'Game', 'Cards'], url: 'https://github.com/Adam-Blf/Borderland', stars: 0, forks: 0 },
    { name: 'Taskmate', desc: 'Plateforme de productivite intelligente avec ML pour priorisation automatique', lang: 'JavaScript', tags: ['JavaScript', 'MERN', 'Productivity'], url: 'https://github.com/Adam-Blf/Taskmate', stars: 0, forks: 0 },
    { name: 'BeeBle', desc: 'Application web BeeBle', lang: 'TypeScript', tags: ['TypeScript', 'Web App'], url: 'https://github.com/Adam-Blf/BeeBle', stars: 0, forks: 0 },
    { name: 'poke-next', desc: 'Application Pokedex/Pokemon construite avec Next.js', lang: 'TypeScript', tags: ['TypeScript', 'Next.js', 'Pokemon'], url: 'https://github.com/Adam-Blf/poke-next', stars: 0, forks: 0 },
    { name: 'TP-Social-Media', desc: 'Backend robuste pour reseau social evenementiel avec MongoDB', lang: 'JavaScript', tags: ['JavaScript', 'Node.js', 'MongoDB', 'REST'], url: 'https://github.com/Adam-Blf/TP-Social-Media', stars: 0, forks: 0 },
    { name: 'folder-analyzer-web', desc: 'Outil audit de fichiers dans le navigateur avec File System Access API', lang: 'JavaScript', tags: ['JavaScript', 'File API', 'Browser'], url: 'https://github.com/Adam-Blf/folder-analyzer-web', stars: 0, forks: 0 },
    { name: 'pin-collector', desc: 'Gestion de collections avec Streamlit - cataloguer et visualiser', lang: 'Python', tags: ['Python', 'Streamlit', 'Data'], url: 'https://github.com/Adam-Blf/pin-collector', stars: 0, forks: 0 },
    { name: 'Mendelieve.io', desc: 'Projet web Mendelieve.io', lang: 'JavaScript', tags: ['JavaScript', 'Web'], url: 'https://github.com/Adam-Blf/Mendelieve.io', stars: 0, forks: 0 },
    { name: 'Snake-Game', desc: 'Snake game with progressive levels, obstacles and leaderboard', lang: 'JavaScript', tags: ['JavaScript', 'Game', 'Canvas'], url: 'https://github.com/Adam-Blf/Snake-Game', stars: 0, forks: 0 },
    { name: 'Pong-Game', desc: 'Classic Pong with AI mode, multiplayer and customizable settings', lang: 'CSS', tags: ['CSS', 'JavaScript', 'Game'], url: 'https://github.com/Adam-Blf/Pong-Game', stars: 0, forks: 0 },
    { name: 'Calculator-JS', desc: 'Scientific calculator with history and keyboard support', lang: 'JavaScript', tags: ['JavaScript', 'Calculator', 'UI'], url: 'https://github.com/Adam-Blf/Calculator-JS', stars: 0, forks: 0 },
  ],
  'Autres': [
    { name: 'EtudiantOS', desc: 'Systeme d\'exploitation etudiant', lang: 'C#', tags: ['C#', 'OS', 'System'], url: 'https://github.com/Adam-Blf/EtudiantOS', stars: 0, forks: 0 },
    { name: 'ExecelCleaner', desc: 'Utilitaire pour nettoyer et normaliser fichiers Excel', lang: 'Python', tags: ['Python', 'Excel', 'Automation'], url: 'https://github.com/Adam-Blf/ExecelCleaner', stars: 0, forks: 0 },
    { name: 'PMU-Game', desc: 'Simulation de paris hippiques', lang: 'CSS', tags: ['CSS', 'JavaScript', 'Game'], url: 'https://github.com/Adam-Blf/PMU-Game', stars: 0, forks: 0 },
    { name: 'Guess-The-Number', desc: 'Interactive number guessing game with hints and best score', lang: 'CSS', tags: ['CSS', 'JavaScript', 'Game'], url: 'https://github.com/Adam-Blf/Guess-The-Number', stars: 0, forks: 0 },
  ],
}
