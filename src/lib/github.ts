// GitHub API Service
// Fetches repositories and stats from GitHub API

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
  size: number
}

export interface ProcessedProject {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  stars: number
  forks: number
  commits?: number
}

export interface GitHubStats {
  projectCount: number
  languageCount: number
  totalCommits: number
  totalStars: number
  languages: string[]
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
  'portfolio-adam', // This portfolio
  'Logo',
  'Keep-Alive',
]

const GITHUB_USERNAME = 'Adam-Blf'

// Fetch repo commit count
async function fetchRepoCommitCount(repoName: string, headers: HeadersInit): Promise<number> {
  try {
    // Use the contributors endpoint which is faster
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contributors?per_page=1`,
      { headers }
    )

    if (!response.ok) return 0

    // Get total from Link header or contributor count
    const contributors = await response.json()
    if (Array.isArray(contributors) && contributors.length > 0) {
      // Sum contributions from all contributors (usually just one for personal repos)
      const total = contributors.reduce((sum: number, c: any) => sum + (c.contributions || 0), 0)
      return total
    }
    return 0
  } catch {
    return 0
  }
}

// Fetch all commit counts for repos (batched)
async function fetchAllCommitCounts(repos: GitHubRepo[], headers: HeadersInit): Promise<Map<string, number>> {
  const commitCounts = new Map<string, number>()

  // Fetch in parallel batches of 5 to avoid rate limiting
  const batchSize = 5
  for (let i = 0; i < repos.length; i += batchSize) {
    const batch = repos.slice(i, i + batchSize)
    const results = await Promise.all(
      batch.map(async (repo) => {
        const count = await fetchRepoCommitCount(repo.name, headers)
        return { name: repo.name, count }
      })
    )
    results.forEach(({ name, count }) => commitCounts.set(name, count))
  }

  return commitCounts
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const username = GITHUB_USERNAME

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

// Fetch GitHub stats for Hero section
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers }
    )

    if (!response.ok) {
      return { projectCount: 37, languageCount: 25, totalCommits: 500, totalStars: 0, languages: [] }
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter repos
    const filteredRepos = repos.filter(repo =>
      !excludedProjects.includes(repo.name) &&
      !repo.fork &&
      !repo.archived
    )

    // Count unique languages
    const languages = new Set<string>()
    filteredRepos.forEach(repo => {
      if (repo.language) languages.add(repo.language)
    })

    // Count total stars
    const totalStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    // Fetch commit counts
    const commitCounts = await fetchAllCommitCounts(filteredRepos, headers)
    const totalCommits = Array.from(commitCounts.values()).reduce((sum, count) => sum + count, 0)

    return {
      projectCount: filteredRepos.length,
      languageCount: languages.size,
      totalCommits,
      totalStars,
      languages: Array.from(languages),
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return { projectCount: 37, languageCount: 25, totalCommits: 500, totalStars: 0, languages: [] }
  }
}

// Fetch repos with commit counts for projects page
export async function fetchReposWithCommits(): Promise<ProcessedProject[]> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const repos = await fetchGitHubRepos()
    const commitCounts = await fetchAllCommitCounts(repos, headers)

    return repos.map(repo => ({
      name: repo.name,
      desc: repo.description || `Projet ${repo.language || 'personnel'}`,
      lang: repo.language || 'Multi',
      tags: repo.topics?.length > 0 ? repo.topics.slice(0, 4) : (repo.language ? [repo.language] : ['Code']),
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      commits: commitCounts.get(repo.name) || 0,
    }))
  } catch (error) {
    console.error('Error fetching repos with commits:', error)
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
    { name: 'ia-pero', desc: 'Semantic similarity explorer with Streamlit and Sentence-Transformers', lang: 'Python', tags: ['Python', 'NLP', 'SBERT', 'Streamlit'], url: 'https://github.com/Adam-Blf/ia-pero', stars: 0, forks: 0, commits: 45 },
    { name: 'LLM-Council', desc: '3-stage LLM deliberation system with anonymized peer review', lang: 'Python', tags: ['Python', 'LLM', 'AI'], url: 'https://github.com/Adam-Blf/LLM-Council', stars: 0, forks: 0, commits: 32 },
    { name: 'AISCA-Cocktails', desc: 'Cocktail recommendation with SBERT semantic search and RAG - EFREI Project', lang: 'Python', tags: ['Python', 'RAG', 'SBERT', 'NLP'], url: 'https://github.com/Adam-Blf/AISCA-Cocktails', stars: 0, forks: 0, commits: 28 },
    { name: 'EFREI-NLP-Anime-Recommendation', desc: 'Moteur de recommandation NLP avec TF-IDF et Cosine Similarity', lang: 'Python', tags: ['Python', 'NLP', 'TF-IDF'], url: 'https://github.com/Adam-Blf/EFREI-NLP-Anime-Recommendation', stars: 0, forks: 0, commits: 15 },
    { name: 'Langue-des-signes', desc: 'Apprentissage langue des signes par IA avec MediaPipe et Deep Learning', lang: 'Python', tags: ['Python', 'Computer Vision', 'MediaPipe', 'Deep Learning'], url: 'https://github.com/Adam-Blf/Langue-des-signes', stars: 0, forks: 0, commits: 22 },
  ],
  'Fullstack / Web': [
    { name: 'genius', desc: 'PWA de micro-learning gamifie - Apprends en swipant', lang: 'TypeScript', tags: ['TypeScript', 'PWA', 'Gamification'], url: 'https://github.com/Adam-Blf/genius', stars: 0, forks: 0, commits: 67 },
    { name: 'Echo', desc: 'PWA Dating App - Dating reinvented with real-time authenticity', lang: 'TypeScript', tags: ['TypeScript', 'PWA', 'Real-time'], url: 'https://github.com/Adam-Blf/Echo', stars: 0, forks: 0, commits: 89 },
    { name: 'Taskmate', desc: 'Plateforme de productivite intelligente avec ML pour priorisation automatique', lang: 'JavaScript', tags: ['JavaScript', 'MERN', 'Productivity'], url: 'https://github.com/Adam-Blf/Taskmate', stars: 0, forks: 0, commits: 54 },
    { name: 'folder-analyzer-web', desc: 'Outil audit de fichiers dans le navigateur avec File System Access API', lang: 'JavaScript', tags: ['JavaScript', 'File API', 'Browser'], url: 'https://github.com/Adam-Blf/folder-analyzer-web', stars: 0, forks: 0, commits: 18 },
  ],
  'Autres': [
    { name: 'EtudiantOS', desc: 'Systeme d\'exploitation etudiant', lang: 'C#', tags: ['C#', 'OS', 'System'], url: 'https://github.com/Adam-Blf/EtudiantOS', stars: 0, forks: 0, commits: 12 },
    { name: 'ExcelCleaner', desc: 'Utilitaire pour nettoyer et normaliser fichiers Excel', lang: 'Python', tags: ['Python', 'Excel', 'Automation'], url: 'https://github.com/Adam-Blf/ExcelCleaner', stars: 0, forks: 0, commits: 8 },
  ],
}

// Calculate stats from fallback
export const fallbackStats: GitHubStats = {
  projectCount: Object.values(fallbackProjects).flat().length,
  languageCount: new Set(Object.values(fallbackProjects).flat().map(p => p.lang)).size,
  totalCommits: Object.values(fallbackProjects).flat().reduce((sum, p) => sum + (p.commits || 0), 0),
  totalStars: 0,
  languages: Array.from(new Set(Object.values(fallbackProjects).flat().map(p => p.lang))),
}
