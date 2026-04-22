import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('baidu_refresh_token')?.value
  if (!refreshToken) {
    return NextResponse.json({ error: 'no_refresh_token' }, { status: 401 })
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.BAIDU_APP_KEY!,
    client_secret: process.env.BAIDU_SECRET_KEY!,
  })

  const res = await fetch(`https://openapi.baidu.com/oauth/2.0/token?${params}`)
  const data = await res.json()

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  const expiresAt = Date.now() + data.expires_in * 1000

  response.cookies.set('baidu_access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: data.expires_in,
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
