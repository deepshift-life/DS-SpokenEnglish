import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import type { LearningUnit, Level } from '@ds/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL,
})

export async function POST(req: NextRequest) {
  const { scene, level = 'beginner' } = await req.json() as { scene: string; level?: Level }

  if (!scene) return NextResponse.json({ error: 'scene required' }, { status: 400 })

  const levelDesc = level === 'beginner' ? 'simple vocabulary, short sentences (A2-B1)'
    : level === 'intermediate' ? 'natural conversational English (B1-B2)'
    : 'fluent, idiomatic English (B2-C1)'

  const prompt = `Generate a spoken English learning unit for Chinese learners. Scene: "${scene}". Level: ${levelDesc}.

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "title": "short scene title in Chinese (max 10 chars)",
  "dialogueText": "a natural 4-6 line spoken dialogue between two people, relevant to the scene",
  "chunks": [
    { "id": "c1", "text": "a key phrase from the dialogue", "scene": "one-line usage tip in Chinese" },
    { "id": "c2", "text": "another key phrase", "scene": "usage tip" },
    { "id": "c3", "text": "another key phrase", "scene": "usage tip" },
    { "id": "c4", "text": "another key phrase", "scene": "usage tip" }
  ]
}

Rules:
- dialogueText: natural spoken English only, no stage directions
- chunks: 4 phrases, each 2-6 words, high-frequency, immediately usable
- scene field in chunks: practical tip like "点餐时用" or "表示感谢时说"
- No grammar explanations, no vocabulary lists`

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      thinking: { type: 'disabled' },
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content.find(b => b.type === 'text')?.text ?? ''
    const parsed = JSON.parse(text)

    const unit: Omit<LearningUnit, 'audioUrl'> & { audioUrl: string } = {
      id: `gen-${Date.now()}`,
      level,
      scene,
      title: parsed.title,
      audioUrl: '',
      dialogueText: parsed.dialogueText,
      chunks: parsed.chunks.map((c: { id: string; text: string; scene: string }) => ({
        ...c,
        audioUrl: '',
      })),
    }

    return NextResponse.json({ unit })
  } catch (e) {
    console.error('generate error', e)
    return NextResponse.json({ error: 'generation failed' }, { status: 500 })
  }
}
