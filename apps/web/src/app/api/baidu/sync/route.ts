import { NextRequest, NextResponse } from 'next/server'

const BAIDU_PCS = 'https://d.pcs.baidu.com/rest/2.0/pcs/file'
const PROGRESS_PATH = '/apps/DS速通英语/progress.json'

function getToken(req: NextRequest) {
  return req.cookies.get('baidu_access_token')?.value ?? null
}

// GET — download progress.json from Baidu Netdisk
export async function GET(req: NextRequest) {
  const token = getToken(req)
  if (!token) return NextResponse.json({ error: 'not_logged_in' }, { status: 401 })

  const url = new URL(BAIDU_PCS)
  url.searchParams.set('method', 'download')
  url.searchParams.set('access_token', token)
  url.searchParams.set('path', PROGRESS_PATH)

  const res = await fetch(url.toString())
  if (res.status === 404) return NextResponse.json({ progress: null })
  if (!res.ok) return NextResponse.json({ error: 'fetch_failed' }, { status: 502 })

  try {
    const progress = await res.json()
    return NextResponse.json({ progress })
  } catch {
    return NextResponse.json({ progress: null })
  }
}

// POST — upload progress.json to Baidu Netdisk (overwrite)
export async function POST(req: NextRequest) {
  const token = getToken(req)
  if (!token) return NextResponse.json({ error: 'not_logged_in' }, { status: 401 })

  const { progress } = await req.json()
  if (!progress) return NextResponse.json({ error: 'no_progress' }, { status: 400 })

  const url = new URL(BAIDU_PCS)
  url.searchParams.set('method', 'upload')
  url.searchParams.set('access_token', token)
  url.searchParams.set('path', PROGRESS_PATH)
  url.searchParams.set('ondup', 'overwrite')

  const body = new FormData()
  body.append('file', new Blob([JSON.stringify(progress)], { type: 'application/json' }), 'progress.json')

  const res = await fetch(url.toString(), { method: 'POST', body })
  if (!res.ok) return NextResponse.json({ error: 'upload_failed' }, { status: 502 })

  return NextResponse.json({ ok: true })
}
