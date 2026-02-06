import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting for API routes (per IP, in-memory)
const apiRateLimit = new Map<string, { count: number; resetTime: number }>()
const API_RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const API_RATE_LIMIT_MAX = 60 // max 60 requests per minute per IP

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // === 1. Block suspicious paths (common attack vectors) ===
  const blockedPatterns = [
    /\.php$/i,
    /\.asp$/i,
    /\.aspx$/i,
    /\.jsp$/i,
    /\.cgi$/i,
    /wp-admin/i,
    /wp-login/i,
    /wp-content/i,
    /wp-includes/i,
    /xmlrpc/i,
    /\.git\//i,
    /\.env/i,
    /\.sql/i,
    /\.bak/i,
    /\.config$/i,
    /phpmyadmin/i,
    /admin\/?$/i,
    /\.htaccess/i,
    /\.htpasswd/i,
    /\/\.\./i, // directory traversal
  ]

  if (blockedPatterns.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 })
  }

  // === 2. API route rate limiting ===
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const now = Date.now()
    const entry = apiRateLimit.get(ip)

    if (!entry || now > entry.resetTime) {
      apiRateLimit.set(ip, { count: 1, resetTime: now + API_RATE_LIMIT_WINDOW })
    } else {
      entry.count++
      if (entry.count > API_RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Too many requests' },
          {
            status: 429,
            headers: {
              'Retry-After': '60',
              'X-Content-Type-Options': 'nosniff',
            },
          }
        )
      }
    }

    // Prevent API responses from being cached in browsers if sensitive
    response.headers.set('X-Content-Type-Options', 'nosniff')
  }

  // === 3. Security headers for all responses ===
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  // Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon\\.ico|images/|logos/|manifest\\.json|robots\\.txt).*)',
  ],
}
