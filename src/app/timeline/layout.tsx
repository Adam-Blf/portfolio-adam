import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'Parcours de Adam Beloucif : experiences professionnelles, formations, certifications et engagements.',
  openGraph: {
    title: 'Timeline | Adam Beloucif',
    description:
      'Parcours : experiences, formations, certifications et engagements associatifs.',
  },
}

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
