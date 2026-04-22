import { NextRequest, NextResponse } from 'next/server'

// In-memory cache: text → audio buffer (resets on server restart, fine for dev)
const cache = new Map<string, Buffer>()

const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL' // ElevenLabs "Sarah" — natural American English
const MODEL_ID = 'eleven_turbo_v2_5'

function audioResponse(buf: Buffer) {
  const body = new ArrayBuffer(buf.byteLength)
  new Uint8Array(body).set(buf)

  return new NextResponse(body, {
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400' },
  })
}

export async function POST(req: NextRequest) {
  const { text } = await req.json() as { text: string }
  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 })

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'no_key' }, { status: 503 })
  }

  const cacheKey = text.trim().toLowerCase()
  if (cache.has(cacheKey)) {
    const buf = cache.get(cacheKey)!
    return audioResponse(buf)
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'elevenlabs_error', status: res.status }, { status: 502 })
  }

  const buf = Buffer.from(await res.arrayBuffer())
  cache.set(cacheKey, buf)

  return audioResponse(buf)
}
