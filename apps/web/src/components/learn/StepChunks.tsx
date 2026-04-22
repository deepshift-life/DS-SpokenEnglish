'use client'

import { useState, useRef } from 'react'
import type { LearningUnit, Chunk } from '@ds/types'
import { speakText } from '@ds/audio'
import type { PlaybackHandle } from '@ds/audio'
import { Button } from '@ds/ui'

interface Props {
  unit: LearningUnit
  onNext: () => void
}

export function StepChunks({ unit, onNext }: Props) {
  const [current, setCurrent] = useState(0)
  const [played, setPlayed] = useState(false)
  const handleRef = useRef<PlaybackHandle | null>(null)

  const chunk = unit.chunks[current]
  const isLast = current === unit.chunks.length - 1

  async function playChunk(c: Chunk) {
    handleRef.current?.stop()
    setPlayed(false)
    const h = await speakText(c.text, () => setPlayed(true))
    handleRef.current = h
    if (!h) setPlayed(true)
  }

  function handleNext() {
    if (isLast) {
      onNext()
    } else {
      setCurrent(i => i + 1)
      setPlayed(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-1">Step 2 · 短语块</p>
        <p className="text-slate-500 text-sm">{current + 1} / {unit.chunks.length}</p>
      </div>

      {/* Chunk card */}
      <div className="w-full bg-slate-800 rounded-2xl p-8 text-center">
        <p className="text-3xl font-semibold text-white leading-snug">{chunk.text}</p>
        <p className="text-slate-500 text-sm mt-3">{chunk.scene}</p>
      </div>

      {/* Play + repeat */}
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => playChunk(chunk)}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          听一遍
        </Button>
        <Button variant="secondary" onClick={() => playChunk(chunk)}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          跟读
        </Button>
      </div>

      <Button size="lg" onClick={handleNext}>
        {isLast ? '全部记住了，开始说 →' : '下一个 →'}
      </Button>
    </div>
  )
}
