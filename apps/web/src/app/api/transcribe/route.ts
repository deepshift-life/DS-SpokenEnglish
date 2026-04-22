import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 503 })
  }

  const formData = await req.formData()
  const audio = formData.get('audio') as Blob | null
  const language = (formData.get('language') as string) || 'en'

  if (!audio) {
    return NextResponse.json({ error: 'audio required' }, { status: 400 })
  }

  const body = new FormData()
  body.append('file', audio, 'recording.webm')
  body.append('model', 'whisper-1')
  body.append('language', language)
  body.append('response_format', 'json')

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body,
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Whisper error', err)
    return NextResponse.json({ error: 'transcription failed' }, { status: 502 })
  }

  const { text } = await res.json() as { text: string }
  return NextResponse.json({ text: text.trim() })
}
