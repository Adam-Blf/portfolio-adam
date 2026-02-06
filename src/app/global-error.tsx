'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body style={{ background: '#0B0F1A', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#FFB000' }}>
            Oops !
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94A3B8', marginBottom: '2rem', maxWidth: '500px' }}>
            Une erreur inattendue s&apos;est produite. Veuillez réessayer.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.875rem 1.75rem',
              background: '#FFB000',
              color: '#0B0F1A',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
