import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Types',
  description:
    'Decouvrez les types de competences de Adam Beloucif : Langages, Frameworks, Data, Cloud, IA. Stack technique complete extraite de GitHub.',
  openGraph: {
    title: 'Types | Adam Beloucif',
    description:
      'Types de competences : Langages, Frameworks, Data, Cloud et IA. Donnees en temps reel depuis GitHub.',
  },
}

export default function TypesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
