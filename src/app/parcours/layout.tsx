import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parcours',
  description:
    'Parcours professionnel et academique de Adam Beloucif : experiences, formations et certifications en Data Engineering et developpement Fullstack.',
}

export default function ParcoursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
