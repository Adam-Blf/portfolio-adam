import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Decouvrez les competences de Adam Beloucif : Langages, Frameworks, Data, Cloud, IA. Stack technique complete extraite de GitHub.',
  openGraph: {
    title: 'Skills | Adam Beloucif',
    description:
      'Competences : Langages, Frameworks, Data, Cloud et IA. Donnees en temps reel depuis GitHub.',
  },
}

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
