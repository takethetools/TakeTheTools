import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const runtime = 'edge';

/**
 * Middleware to block common malicious scan paths and WordPress probing attempts.
 * Returns a 404 response for any matching request.
 */
export async function middleware(request: NextRequest) {
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

  // Admin route protection
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_me");
      const { jwtVerify } = await import('jose');
      await jwtVerify(session, secret);
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
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
