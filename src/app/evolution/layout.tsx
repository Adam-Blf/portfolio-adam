import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evolution',
  description:
    'Chaine d\'evolution de Adam Beloucif : parcours professionnel, formations, certifications et engagements. Du starter au champion.',
  openGraph: {
    title: 'Evolution | Adam Beloucif',
    description:
      'Chaine d\'evolution : experiences, formations, certifications et engagements associatifs.',
  },
}

export default function EvolutionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
