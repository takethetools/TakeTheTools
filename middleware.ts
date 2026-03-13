import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const runtime = 'edge';

/**
 * Middleware to block common malicious scan paths and WordPress probing attempts.
 * Returns a 404 response for any matching request.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const blockedPaths = [
    '/wp-admin',
    '/wp-login.php',
    '/wp-includes',
    '/xmlrpc.php',
    '/.env',
    '/.git',
    '/config',
    '/phpmyadmin',
  ];

  // Check if the request path starts with any blocked path
  for (const blocked of blockedPaths) {
    if (pathname.startsWith(blocked)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // Continue to the next handler if no block matches
  return NextResponse.next();
}

/**
 * Apply middleware to all routes except Next.js internal assets.
 */
export const config = {
  matcher: ['/((?!_next).*)'],
};
