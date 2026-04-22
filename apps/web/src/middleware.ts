import { NextRequest, NextResponse } from 'next/server'

// These paths require login (cloud sync features)
const AUTH_REQUIRED_PATHS = ['/resources', '/api/baidu']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const requiresAuth = AUTH_REQUIRED_PATHS.some(p => pathname.startsWith(p))
  if (!requiresAuth) return NextResponse.next()

  const accessToken = request.cookies.get('baidu_access_token')?.value
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?from=' + encodeURIComponent(pathname), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
