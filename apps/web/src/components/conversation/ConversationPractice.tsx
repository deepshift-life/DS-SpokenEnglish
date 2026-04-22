'use client'

import { useState, useRef, useEffect } from 'react'
import { startRecording } from '@ds/audio'
import type { RecordingHandle } from '@ds/audio'
import { VolumeBar, Spinner } from '@ds/ui'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SCENES = [
  { id: 'cafe', label: '咖啡馆点单', prompt: 'ordering coffee at a café' },
  { id: 'interview', label: '工作面试', prompt: 'a job interview in English' },
  { id: 'travel', label: '机场/旅行', prompt: 'traveling — airport, hotel, directions' },
  { id: 'shopping', label: '购物砍价', prompt: 'shopping and negotiating prices' },
  { id: 'smalltalk', label: '日常闲聊', prompt: 'casual small talk with a new friend' },
  { id: 'free', label: '自由对话', prompt: '' },
]

export function ConversationPractice() {
  const [scene, setScene] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [recording, setRecording] = useState(false)
  const [volume, setVolume] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const recHandleRef = useRef<RecordingHandle | null>(null)
  const volRafRef = useRef<number>(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startConversation(s: typeof SCENES[0]) {
    setScene(s.id)
    const opener: Message = { role: 'user', content: 'Hi, let\'s practice!' }
    setMessages([opener])
    await sendToAI([opener], s.prompt)
  }

  async function sendToAI(msgs: Message[], scenePrompt?: string) {
    setStreaming(true)
    const placeholder: Message = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, placeholder])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: msgs,
          scene: scenePrompt ?? SCENES.find(s => s.id === scene)?.prompt ?? '',
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let text = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: text }
          return next
        })
      }
    } catch {
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: '(Connection error — please try again)' }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    await sendToAI(next)
  }

  const [transcribing, setTranscribing] = useState(false)

  async function toggleRecord() {
    if (recording) {
      cancelAnimationFrame(volRafRef.current)
      setVolume(0)
      setRecording(false)
      if (recHandleRef.current) {
        try {
          const { blob } = await recHandleRef.current.stop()
          recHandleRef.current = null
          if (blob.size > 0) {
            setTranscribing(true)
            try {
              const fd = new FormData()
              fd.append('audio', blob, 'recording.webm')
              fd.append('language', 'en')
              const res = await fetch('/api/transcribe', { method: 'POST', body: fd })
              if (res.ok) {
                const { text } = await res.json() as { text: string }
                if (text) setInput(text)
              } else {
                setInput('(transcription unavailable — add OPENAI_API_KEY)')
              }
            } finally {
              setTranscribing(false)
            }
          }
        } catch { /* ignore */ }
      }
      return
    }
    try {
      const handle = await startRecording()
      recHandleRef.current = handle
      setRecording(true)
      const poll = () => {
        setVolume(handle.getVolume())
        volRafRef.current = requestAnimationFrame(poll)
      }
      volRafRef.current = requestAnimationFrame(poll)
    } catch {
      setInput('(mic access denied)')
    }
  }

  if (!scene) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">对话练习</h2>
          <p className="text-slate-400 text-sm">选一个场景，开始用英语对话</p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {SCENES.map(s => (
            <button
              key={s.id}
              onClick={() => startConversation(s)}
              className="py-4 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors text-center"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const currentScene = SCENES.find(s => s.id === scene)!

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <button
          onClick={() => { setScene(null); setMessages([]) }}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-medium">{currentScene.label}</span>
        <span className="ml-auto text-xs text-slate-500">AI 对话伙伴</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-slate-800 text-slate-100 rounded-bl-sm'
              }`}
            >
              {m.content || (
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex gap-2 items-end">
          <button
            onClick={toggleRecord}
            disabled={transcribing}
            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              recording ? 'bg-red-500 hover:bg-red-400' : transcribing ? 'bg-slate-700' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {transcribing ? (
              <Spinner className="text-emerald-400" />
            ) : recording ? (
              <VolumeBar volume={volume} bars={5} />
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V22H8v2h8v-2h-3v-1.06A9 9 0 0 0 21 12v-2h-2z" />
              </svg>
            )}
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Type in English..."
            rows={1}
            className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || streaming}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
