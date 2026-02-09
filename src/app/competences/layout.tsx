import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Competences',
  description:
    'Stack technique de Adam Beloucif : Python, TypeScript, React, Next.js, Machine Learning, Docker et 50+ technologies maitrisees a travers des projets concrets.',
  openGraph: {
    title: 'Competences | Adam Beloucif',
    description:
      'Stack technique complete : langages, frameworks, IA/ML, cloud et DevOps. Donnees en temps reel depuis GitHub.',
  },
}

export default function CompetencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
