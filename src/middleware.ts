import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith('/login');

  // If no token and user is NOT on login page, redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user has a token and tries to access login page, redirect to home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'], // Apply middleware only to these routes
};
