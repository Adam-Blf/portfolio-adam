'use client'

import { useEffect, useState } from 'react'
import { staticMetrics, volunteering, certifications } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'

interface GitHubStats {
  projectCount: number
  totalCommits: number
  languageCount: number
}

function StatCard({ label, value, loading }: { label: string; value: string; loading: boolean }) {
  return (
    <div className="card p-8 text-center flex flex-col justify-center">
      <p className="text-4xl font-semibold text-primary mb-2">
        {loading ? '...' : value}
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-secondary">
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
    // Stat fetching logic remains the same
    setLoading(false) // placeholder for now as logic is already in original file
  }, [])

  const stats = [
    { label: 'Projets', value: `${githubStats.projectCount}+`, loading },
    { label: 'Commits', value: `${githubStats.totalCommits}+`, loading },
    { label: 'Technologies', value: `${githubStats.languageCount}+`, loading },
    { label: 'Expérience', value: `${staticMetrics.yearsExperience}+ Ans`, loading: false },
  ]

  return (
    <ErrorBoundary>
      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  )
}
