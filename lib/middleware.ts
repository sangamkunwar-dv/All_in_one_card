import { NextRequest, NextResponse } from 'next/server';

const ADMIN_ROUTES = ['/admin/dashboard'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if this is an admin route
  if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
