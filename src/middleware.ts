import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const isLoginPage = req.nextUrl.pathname.startsWith('/login');

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};
