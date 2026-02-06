'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c0c0c',
          color: '#fafafa',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            ⚠️
          </div>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Erreur critique
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '24px',
              lineHeight: 1.6,
            }}
          >
            Une erreur inattendue s&apos;est produite.
            Veuillez rafraichir la page ou reessayer.
          </p>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              textAlign: 'left',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '24px',
            }}
          >
            <div style={{ color: '#ef4444' }}>
              [CRITICAL] Application crashed
            </div>
            <div style={{ color: '#eab308', marginTop: '4px' }}>
              [INFO] Reload required
            </div>
            {error.digest && (
              <div style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                Digest: {error.digest}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: '#FFB000',
                color: '#0c0c0c',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Reessayer
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: 'transparent',
                color: '#fafafa',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Accueil
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
