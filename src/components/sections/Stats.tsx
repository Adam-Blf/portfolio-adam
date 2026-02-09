'use client'

import { useEffect, useState } from 'react'
import { staticMetrics, volunteering, certifications } from '@/lib/data'

interface GitHubStats {
  projectCount: number
  totalCommits: number
  languageCount: number
}

interface StatItem {
  value: number
  label: string
  suffix: string
  loading: boolean
}

function StatCard({ value, suffix, label, loading }: StatItem) {
  return (
    <div className="text-center py-6 px-4" role="listitem">
      <p
        className="text-4xl md:text-5xl font-bold text-white leading-none"
        aria-label={loading ? `Chargement ${label}` : `${value}${suffix} ${label}`}
      >
        {loading ? (
          <span
            className="inline-block w-16 h-10 rounded"
            style={{ backgroundColor: 'var(--bg-surface, #1a1a1a)' }}
            aria-hidden="true"
          />
        ) : (
          <>
            <span style={{ color: 'var(--accent, #E50914)' }}>{value}</span>
            <span className="text-white">{suffix}</span>
          </>
        )}
      </p>
      <p
        className="text-sm mt-2 uppercase tracking-wider font-medium"
        style={{ color: 'var(--text-secondary, #B3B3B3)' }}
      >
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

  // Count unique volunteer roles
  const volunteerRoles = new Set(volunteering.map(v => v.org)).size

  const stats: StatItem[] = [
    { value: githubStats.projectCount, label: 'Projets GitHub', suffix: '+', loading },
    { value: certifications.length, label: 'Certifications', suffix: '', loading: false },
    { value: staticMetrics.yearsExperience, label: 'Années d\'expérience', suffix: '+', loading: false },
    { value: volunteerRoles, label: 'Rôles associatifs', suffix: '', loading: false },
  ]

  return (
    <section
      className="py-12"
      style={{
        backgroundColor: 'var(--bg-surface, #1a1a1a)',
        borderTop: '1px solid var(--border, rgba(255,255,255,0.1))',
        borderBottom: '1px solid var(--border, rgba(255,255,255,0.1))',
      }}
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">Statistiques en chiffres</h2>
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" role="list">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              loading={stat.loading}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
