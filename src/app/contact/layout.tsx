import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Adam Beloucif : formulaire de contact pour opportunites en Data Engineering, developpement Fullstack ou collaboration tech.',
  openGraph: {
    title: 'Contact | Adam Beloucif',
    description:
      'Un projet en tete ? Contactez Adam Beloucif pour discuter de Data Engineering, IA ou developpement Fullstack.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
