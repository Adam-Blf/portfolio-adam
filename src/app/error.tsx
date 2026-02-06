'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
      <h1 className="text-headline text-accent mb-4">Erreur</h1>
      <p className="text-body-lg mb-8 max-w-md">
        Quelque chose s&apos;est mal passé. Veuillez réessayer ou retourner à l&apos;accueil.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="btn btn-primary">
          Réessayer
        </button>
        <Link href="/" className="btn btn-outline">
          Accueil
        </Link>
      </div>
    </div>
  )
}
