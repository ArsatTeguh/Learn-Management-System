import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define route configurations
const ROUTE_CONFIG = {
  protected: ['/client', '/add-course'],
  public: ['/auth/signin', '/auth/register'],
  default: '/',
} as const;

// Matcher config for Next.js optimization
export const config = {
  matcher: [...ROUTE_CONFIG.protected, ...ROUTE_CONFIG.public],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token');

  // Create response headers with security headers
  const headers = new Headers({
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  });

  // Helper function for redirects
  const redirect = (path: string) => {
    const url = new URL(path, req.url);
    return NextResponse.redirect(url, {
      headers,
      status: 307, // Temporary redirect
    });
  };

  try {
    // Check protected routes
    if (ROUTE_CONFIG.protected.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return redirect('/auth/signin');
      }
    }

    // Check public routes
    if (ROUTE_CONFIG.public.includes(pathname as typeof ROUTE_CONFIG.public[number])) {
      if (token) {
        return redirect(ROUTE_CONFIG.default);
      }
    }

    // Continue with added security headers
    return NextResponse.next({
      headers,
    });
  } catch (error) {
    // Fallback to signin page if something goes wrong
    return redirect('/auth/signin');
  }
}
