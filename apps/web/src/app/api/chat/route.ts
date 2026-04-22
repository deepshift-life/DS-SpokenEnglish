import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL,
})

const SYSTEM_PROMPT = `You are an English conversation partner for Chinese learners. Your role:
- Speak ONLY in English, keep sentences short and clear
- Correct pronunciation/grammar mistakes gently, inline: e.g. "Great! (say: 'I went', not 'I go') What happened next?"
- Ask follow-up questions to keep the learner speaking
- Match the learner's level — if they struggle, simplify; if fluent, challenge them
- Focus on natural spoken English, not written formality
- Never switch to Chinese, even if asked
- Keep responses under 3 sentences to maximize learner speaking time`

export async function POST(req: NextRequest) {
  const { messages, scene } = await req.json()

  const systemWithScene = scene
    ? `${SYSTEM_PROMPT}\n\nCurrent conversation scene: ${scene}. Keep the conversation relevant to this context.`
    : SYSTEM_PROMPT

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    thinking: { type: 'disabled' },
    system: systemWithScene,
    messages,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
