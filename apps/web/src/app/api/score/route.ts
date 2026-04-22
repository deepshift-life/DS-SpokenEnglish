import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// 讯飞 ISE (Interactive Speech Evaluation) proxy
// Handles auth signature generation server-side to protect API secrets

function buildXunfeiAuthUrl(): string {
  const appId = process.env.XUNFEI_APP_ID!
  const apiKey = process.env.XUNFEI_API_KEY!
  const apiSecret = process.env.XUNFEI_API_SECRET!

  const host = 'ise-api.xfyun.cn'
  const path = '/v2/open-ise'
  const date = new Date().toUTCString()

  const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(signatureOrigin)
    .digest('base64')

  const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  const authorization = Buffer.from(authorizationOrigin).toString('base64')

  return `wss://${host}${path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`
}

export async function POST(req: NextRequest) {
  if (!process.env.XUNFEI_APP_ID) {
    // Graceful degradation — return mock score if API not configured
    return NextResponse.json({
      fluency: Math.floor(Math.random() * 20) + 75,
      accuracy: Math.floor(Math.random() * 20) + 70,
      completeness: Math.floor(Math.random() * 15) + 80,
      overall: Math.floor(Math.random() * 20) + 72,
      mock: true,
    })
  }

  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as Blob
    const refText = formData.get('refText') as string

    if (!audio || !refText) {
      return NextResponse.json({ error: 'audio and refText required' }, { status: 400 })
    }

    const wsUrl = buildXunfeiAuthUrl()
    const audioBuffer = Buffer.from(await audio.arrayBuffer())
    const audioBase64 = audioBuffer.toString('base64')

    // Use native WebSocket (Node 18+) to call 讯飞 ISE
    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      const ws = new WebSocket(wsUrl)
      let resultData = ''

      ws.addEventListener('open', () => {
        const frame = {
          common: { app_id: process.env.XUNFEI_APP_ID },
          business: {
            category: 'read_sentence',
            rstcd: 'utf8',
            group: 'pupil',
            sub: 'ise',
            ent: 'cn_vip',
            tte: 'utf-8',
            cmd: 'ssb',
            auf: 'audio/L16;rate=16000',
            aue: 'raw',
            text: '﻿' + refText,
          },
          data: {
            status: 0,
            encoding: 'raw',
            audio: audioBase64,
          },
        }
        ws.send(JSON.stringify(frame))

        // Send end frame
        ws.send(JSON.stringify({
          data: { status: 2, encoding: 'raw', audio: '' },
        }))
      })

      ws.addEventListener('message', (event: MessageEvent) => {
        const msg = JSON.parse(typeof event.data === 'string' ? event.data : event.data.toString())
        if (msg.data?.data) resultData += msg.data.data
        if (msg.data?.status === 2) {
          ws.close()
          try {
            const parsed = JSON.parse(Buffer.from(resultData, 'base64').toString('utf8'))
            resolve(parsed)
          } catch {
            resolve({})
          }
        }
      })

      ws.addEventListener('error', () => reject(new Error('ws error')))
      setTimeout(() => reject(new Error('timeout')), 10000)
    })

    // Extract scores from 讯飞 response structure
    const syll = (result as { xml_result?: { read_sentence?: { rec_paper?: { read_chapter?: { read_sentence?: { fluency_score?: number; accuracy_score?: number; integrity_score?: number; total_score?: number } } } } } })
      ?.xml_result?.read_sentence?.rec_paper?.read_chapter?.read_sentence

    return NextResponse.json({
      fluency: Math.round((syll?.fluency_score ?? 0) * 10),
      accuracy: Math.round((syll?.accuracy_score ?? 0) * 10),
      completeness: Math.round((syll?.integrity_score ?? 0) * 10),
      overall: Math.round((syll?.total_score ?? 0) * 10),
    })
  } catch (e) {
    console.error('score error', e)
    return NextResponse.json({ error: 'scoring failed' }, { status: 500 })
  }
}
