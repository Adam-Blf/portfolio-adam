import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Decouvrez les projets de Adam Beloucif : tous les projets GitHub catalogues. IA, Fullstack, Data Engineering.',
  openGraph: {
    title: 'Projects | Adam Beloucif',
    description:
      'Decouvrez les projets de Adam Beloucif : tous les projets GitHub catalogues.',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
