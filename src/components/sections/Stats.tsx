'use client'

import { useEffect, useState } from 'react'
import { staticMetrics, volunteering, certifications } from '@/lib/data'

interface GitHubStats {
  projectCount: number
  totalCommits: number
  languageCount: number
}

interface StatBarItem {
  label: string
  value: number
  displayValue: string
  color: string
  maxValue: number
  loading: boolean
}

function StatBar({ label, value, displayValue, color, maxValue, loading }: StatBarItem) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  return (
    <div className="flex items-center gap-3" role="listitem">
      <span
        className="font-mono text-xs font-bold uppercase w-24 text-right shrink-0"
        style={{ color: 'var(--pokedex-dark)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-4 rounded overflow-hidden" style={{ backgroundColor: 'var(--pokedex-screen-dark)' }}>
        {loading ? (
          <div className="h-full w-1/2 skeleton" />
        ) : (
          <div
            className="h-full rounded transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        )}
      </div>
      <span
        className="font-mono text-sm font-bold w-16 text-right shrink-0"
        style={{ color: 'var(--pokedex-dark)' }}
        aria-label={`${label}: ${displayValue}`}
      >
        {loading ? '...' : displayValue}
      </span>
    </div>
  )
}

export default function Stats() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    projectCount: 35,
    totalCommits: 500,
    languageCount: 30
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const CACHE_KEY = 'github-stats-section'
    const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

    async function fetchStats() {
      // Check cache
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setGithubStats(data)
            setLoading(false)
            return
          }
        }
      } catch (e) {}

      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })

        if (!response.ok) {
          setLoading(false)
          return
        }

        const repos = await response.json()
        const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam', 'LLM-Council', '99']
        const filteredRepos = repos.filter((repo: any) =>
          !excludedRepos.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        )

        // Count languages
        const languages = new Set<string>()
        filteredRepos.forEach((repo: any) => {
          if (repo.language) languages.add(repo.language)
        })

        // Estimate commits
        let totalCommits = 0
        const topRepos = filteredRepos.slice(0, 10)
        await Promise.all(
          topRepos.map(async (repo: any) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/Adam-Blf/${repo.name}/contributors?per_page=1`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
              )
              if (res.ok) {
                const contributors = await res.json()
                if (Array.isArray(contributors)) {
                  totalCommits += contributors.reduce((s: number, c: any) => s + (c.contributions || 0), 0)
                }
              }
            } catch {}
          })
        )
        const avgPerRepo = topRepos.length > 0 ? totalCommits / topRepos.length : 15
        const estimatedCommits = Math.round(avgPerRepo * filteredRepos.length)

        const stats = {
          projectCount: filteredRepos.length,
          totalCommits: estimatedCommits,
          languageCount: languages.size
        }

        setGithubStats(stats)

        // Cache
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats, timestamp: Date.now() }))
        } catch {}

      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const stats: StatBarItem[] = [
    { label: 'PROJETS', value: githubStats.projectCount, displayValue: `${githubStats.projectCount}+`, color: '#F08030', maxValue: 60, loading },
    { label: 'COMMITS', value: githubStats.totalCommits, displayValue: `${githubStats.totalCommits}+`, color: '#6890F0', maxValue: 1000, loading },
    { label: 'TECHNOLOGIES', value: githubStats.languageCount, displayValue: `${githubStats.languageCount}+`, color: '#78C850', maxValue: 40, loading },
    { label: 'EXP. (ANS)', value: staticMetrics.yearsExperience, displayValue: `${staticMetrics.yearsExperience}+`, color: '#F8D030', maxValue: 10, loading: false },
  ]

  return (
    <section className="py-6 md:py-10" aria-labelledby="stats-heading">
      <div className="container-wide">
        <div className="pokedex-shell p-4 md:p-6">
          <div className="pokedex-screen p-4 md:p-6">
            <h2
              id="stats-heading"
              className="font-mono font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--pokedex-dark)' }}
            >
              ── EXP. POINTS ──
            </h2>
            <div className="space-y-3" role="list">
              {stats.map((stat) => (
                <StatBar key={stat.label} {...stat} />
              ))}
            </div>

            {/* Extra info row */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: '2px solid var(--pokedex-screen-dark)' }}>
              <span className="font-mono text-xs" style={{ color: 'var(--pokedex-dark)' }}>
                🏅 CERTIFICATIONS: <strong>{certifications.length}</strong>
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--pokedex-dark)' }}>
                🤝 ROLES ASSOCIATIFS: <strong>{new Set(volunteering.map(v => v.org)).size}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
