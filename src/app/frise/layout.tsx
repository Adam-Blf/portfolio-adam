import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'Parcours professionnel et academique de Adam Beloucif : experiences en Data Engineering, formations a EFREI Paris, certifications et engagements associatifs.',
  openGraph: {
    title: 'Timeline | Adam Beloucif',
    description:
      'Frise chronologique interactive : experiences, formations, certifications et engagements.',
  },
}

export default function FriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
