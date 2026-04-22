import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Exchange code for access_token via Baidu OAuth
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: process.env.BAIDU_APP_KEY!,
    client_secret: process.env.BAIDU_SECRET_KEY!,
    redirect_uri: process.env.BAIDU_REDIRECT_URI!,
  })

  const res = await fetch(`https://openapi.baidu.com/oauth/2.0/token?${params}`)
  const data = await res.json()

  if (data.error) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
  }

  const response = NextResponse.redirect(new URL('/home', request.url))
  const expiresAt = Date.now() + data.expires_in * 1000

  response.cookies.set('baidu_access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: data.expires_in,
    path: '/',
  })
  response.cookies.set('baidu_refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  response.cookies.set('baidu_expires_at', String(expiresAt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: data.expires_in,
    path: '/',
  })

  return response
}
