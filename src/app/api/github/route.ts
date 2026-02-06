import { NextRequest, NextResponse } from 'next/server'

const GITHUB_USERNAME = 'Adam-Blf'
const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam']

// Rate limiting: track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 30 // max 30 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 60 * 1000)

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork: boolean
  archived: boolean
  pushed_at: string
}

interface ProjectWithCommits {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  stars: number
  forks: number
  commits: number
  category: string
}

// Cache for 30 minutes
let cachedData: { projects: ProjectWithCommits[]; stats: any; timestamp: number } | null = null
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

async function fetchCommitCount(repoName: string, headers: HeadersInit): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contributors?per_page=10`,
      { headers, next: { revalidate: 3600 } }
    )

    if (!response.ok) return 0

    const contributors = await response.json()
    if (Array.isArray(contributors)) {
      return contributors.reduce((sum: number, c: any) => sum + (c.contributions || 0), 0)
    }
    return 0
  } catch {
    return 0
  }
}

function categorizeProject(repo: GitHubRepo): string {
  const lowerName = repo.name.toLowerCase()
  const lowerDesc = (repo.description || '').toLowerCase()

  if (
    lowerName.includes('ia') ||
    lowerName.includes('ai') ||
    lowerName.includes('ml') ||
    lowerName.includes('nlp') ||
    lowerName.includes('llm') ||
    lowerName.includes('langue-des-signes') ||
    lowerDesc.includes('machine learning') ||
    lowerDesc.includes('deep learning') ||
    lowerDesc.includes('neural') ||
    lowerDesc.includes('nlp') ||
    lowerDesc.includes('sbert') ||
    lowerDesc.includes('semantic') ||
    lowerDesc.includes('recommendation') ||
    lowerDesc.includes('ai')
  ) {
    return 'IA / Machine Learning'
  }

  if (
    repo.language === 'TypeScript' ||
    repo.language === 'JavaScript' ||
    repo.language === 'HTML' ||
    repo.language === 'CSS' ||
    lowerDesc.includes('pwa') ||
    lowerDesc.includes('web') ||
    lowerDesc.includes('app') ||
    lowerDesc.includes('frontend') ||
    lowerDesc.includes('backend')
  ) {
    return 'Fullstack / Web'
  }

  return 'Autres'
}

export async function GET(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        },
      }
    )
  }

  // Check cache
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    )

    if (!reposRes.ok) {
      throw new Error('GitHub API error')
    }

    const repos: GitHubRepo[] = await reposRes.json()

    // Filter repos
    const filteredRepos = repos.filter(
      (repo) => !excludedRepos.includes(repo.name) && !repo.fork && !repo.archived
    )

    // Fetch commits for each repo (in batches)
    const projects: ProjectWithCommits[] = []
    const batchSize = 5

    for (let i = 0; i < filteredRepos.length; i += batchSize) {
      const batch = filteredRepos.slice(i, i + batchSize)
      const batchResults = await Promise.all(
        batch.map(async (repo) => {
          const commits = await fetchCommitCount(repo.name, headers)
          const tags: string[] = []
          if (repo.language) tags.push(repo.language)
          if (repo.topics) tags.push(...repo.topics.slice(0, 4))

          return {
            name: repo.name,
            desc: repo.description || `Projet ${repo.language || 'personnel'}`,
            lang: repo.language || 'Multi',
            tags: tags.length > 0 ? tags : ['Code'],
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            commits,
            category: categorizeProject(repo),
          }
        })
      )
      projects.push(...batchResults)
    }

    // Calculate stats
    const languages = new Set(projects.map((p) => p.lang).filter(Boolean))
    const totalCommits = projects.reduce((sum, p) => sum + p.commits, 0)
    const totalStars = projects.reduce((sum, p) => sum + p.stars, 0)

    const stats = {
      projectCount: projects.length,
      languageCount: languages.size,
      totalCommits,
      totalStars,
      languages: Array.from(languages),
    }

    // Cache the result
    cachedData = {
      projects,
      stats,
      timestamp: Date.now(),
    }

    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    // Log error without exposing details to client
    console.error('GitHub API error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'An internal error occurred' },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
        },
      }
    )
  }
}
