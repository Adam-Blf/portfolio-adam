import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formation - Cours & Competences | Adam Beloucif',
  description: 'Parcours de formation : Bachelor Communication & Technology (RNCP 35541), Master Data Engineering & IA (RNCP 40875). Cours, hard skills, soft skills.',
  keywords: ['formation', 'EFREI', 'ISIT', 'Data Engineering', 'IA', 'RNCP', 'competences', 'cours'],
}

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
