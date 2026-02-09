'use client'

import { useEffect, useState } from 'react'
import { staticMetrics, volunteering, certifications } from '@/lib/data'

interface GitHubStats {
  projectCount: number
  totalCommits: number
  languageCount: number
}

interface StatCardItem {
  label: string
  value: string
  color: string
  loading: boolean
}

function StatCard({ label, value, color, loading }: StatCardItem) {
  return (
    <div
      className="glass-card p-5 rounded-xl text-center"
      style={{ borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}
    >
      <p
        className="font-mono text-3xl md:text-4xl font-black mb-1"
        style={{ color }}
      >
        {loading ? '...' : value}
      </p>
      <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
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

  const stats: StatCardItem[] = [
    { label: 'PROJETS', value: `${githubStats.projectCount}+`, color: 'var(--accent-cyan)', loading },
    { label: 'COMMITS', value: `${githubStats.totalCommits}+`, color: 'var(--accent-violet)', loading },
    { label: 'TECHNOLOGIES', value: `${githubStats.languageCount}+`, color: 'var(--accent-warm)', loading },
    { label: 'ANNEES', value: `${staticMetrics.yearsExperience}+`, color: '#00ff41', loading: false },
  ]

  return (
    <section className="py-6 md:py-10" aria-labelledby="stats-heading">
      <div className="container-wide">
        <h2
          id="stats-heading"
          className="font-mono font-bold text-sm uppercase tracking-widest mb-6 text-center"
          style={{ color: 'var(--accent-cyan)' }}
        >
          GITHUB STATS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Extra info */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            CERTIFICATIONS: <strong style={{ color: 'var(--text-primary)' }}>{certifications.length}</strong>
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            ROLES ASSOCIATIFS: <strong style={{ color: 'var(--text-primary)' }}>{new Set(volunteering.map(v => v.org)).size}</strong>
          </span>
        </div>
      </div>
    </section>
  )
}
