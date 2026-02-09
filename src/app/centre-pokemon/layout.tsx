import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centre Pokemon',
  description:
    'Contactez Adam Beloucif au Centre Pokemon : formulaire de contact pour opportunites en Data Engineering, developpement Fullstack ou collaboration tech.',
  openGraph: {
    title: 'Centre Pokemon | Adam Beloucif',
    description:
      'Un projet en tete ? Contactez Adam Beloucif au Centre Pokemon pour discuter de Data Engineering, IA ou developpement Fullstack.',
  },
}

export default function CentrePokemonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
