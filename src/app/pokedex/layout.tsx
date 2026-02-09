import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pokedex',
  description:
    'Explorez le Pokedex de Adam Beloucif : tous les projets GitHub captures et catalogues. IA, Fullstack, Data Engineering.',
  openGraph: {
    title: 'Pokedex | Adam Beloucif',
    description:
      'Explorez le Pokedex de Adam Beloucif : tous les projets GitHub captures et catalogues.',
  },
}

export default function PokedexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
