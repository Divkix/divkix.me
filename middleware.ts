import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Content Security Policy (CSP)
  // Configured for Next.js, Framer Motion, and Cloudflare deployment
  // Note: 'unsafe-inline' and 'unsafe-eval' required for Next.js and Framer Motion
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https:;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src https://challenges.cloudflare.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)

  // Strict-Transport-Security (HSTS)
  // Force HTTPS for 2 years, including subdomains
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // X-Frame-Options
  // Prevent clickjacking by denying embedding in frames
  response.headers.set('X-Frame-Options', 'DENY')

  // X-Content-Type-Options
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer-Policy
  // Control referrer information sent with requests
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions-Policy
  // Disable unnecessary browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Cross-Origin-Opener-Policy (COOP)
  // Isolate browsing context from other origins
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')

  // Cross-Origin-Resource-Policy (CORP)
  // Protect resources from being loaded by other origins
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin')

  // X-DNS-Prefetch-Control
  // Control DNS prefetching
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // X-XSS-Protection
  // Legacy XSS protection (for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|tiff?)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
