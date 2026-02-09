import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Decouvrez les projets GitHub de Adam Beloucif : IA, Machine Learning, NLP, applications fullstack React/Next.js, PWA et outils data. 35+ projets open source.',
  openGraph: {
    title: 'Projets | Adam Beloucif',
    description:
      'Portfolio de projets : IA, Machine Learning, Fullstack, PWA. Code source et demos en ligne.',
  },
}

export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
