import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('auth_session')?.value;
  
  let role = null;
  if (sessionCookie) {
    try {
      const parsed = JSON.parse(Buffer.from(sessionCookie, 'base64').toString('utf-8'));
      role = parsed.role;
    } catch (e) {
      // ignore
    }
  }

  // Protect Admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect User orders/checkout routes (example)
  if (request.nextUrl.pathname.startsWith('/orders') || request.nextUrl.pathname.startsWith('/checkout')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/orders/:path*', '/checkout/:path*'],
};
