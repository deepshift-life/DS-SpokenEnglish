'use client'

import { useState, useRef, useEffect } from 'react'
import type { ShadowingPack, AudioSegment } from '@ds/types'
import { Button, ProgressBar, Card } from '@ds/ui'

interface Props {
  pack: ShadowingPack
}

type Phase = 'with-text' | 'without-text'

export function ShadowingPlayer({ pack }: Props) {
  const [phase, setPhase] = useState<Phase>('with-text')
  const [segIndex, setSegIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [shadowing, setShadowing] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const seg: AudioSegment = pack.segments[segIndex]
  const isLast = segIndex === pack.segments.length - 1

  useEffect(() => {
    return () => { audioRef.current?.pause() }
  }, [])

  function playSegment() {
    if (audioRef.current) audioRef.current.pause()
    audioRef.current = new Audio(seg.audioUrl)
    audioRef.current.onended = () => { setPlaying(false); setShadowing(true) }
    audioRef.current.onerror = () => { setPlaying(false); setShadowing(true) }
    audioRef.current.play().catch(() => { setPlaying(false); setShadowing(true) })
    setPlaying(true)
    setShadowing(false)
  }

  function next() {
    if (isLast) {
      if (phase === 'with-text') {
        setPhase('without-text')
        setSegIndex(0)
        setShadowing(false)
        setPlaying(false)
      }
      // else: pack complete — could navigate away
    } else {
      setSegIndex(i => i + 1)
      setShadowing(false)
      setPlaying(false)
    }
  }

  const progress = (segIndex + 1) / pack.segments.length

  return (
    <div className="flex flex-col gap-6">
      {/* Phase indicator */}
      <div className="flex gap-2">
        <div className={`flex-1 py-2 rounded-xl text-center text-sm font-medium transition-colors ${
          phase === 'with-text' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
        }`}>
          第一遍 · 看文字跟读
        </div>
        <div className={`flex-1 py-2 rounded-xl text-center text-sm font-medium transition-colors ${
          phase === 'without-text' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
        }`}>
          第二遍 · 盲跟
        </div>
      </div>

      {/* Progress */}
      <ProgressBar steps={pack.segments.length} current={segIndex} />

      {/* Segment card */}
      <Card className="min-h-[120px] flex items-center justify-center">
        {phase === 'with-text' ? (
          <p className="text-xl font-medium text-white text-center leading-relaxed">{seg.text}</p>
        ) : (
          <p className="text-slate-600 text-sm text-center">
            {shadowing ? '跟读中…' : playing ? '听…' : '准备好了就点播放'}
          </p>
        )}
      </Card>

      {/* Controls */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={playSegment} disabled={playing}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {playing ? '播放中…' : '播放'}
        </Button>
        {shadowing && (
          <Button className="flex-1" onClick={next}>
            {isLast && phase === 'with-text' ? '进入盲跟 →' : isLast ? '完成 ✓' : '下一句 →'}
          </Button>
        )}
      </div>

      {shadowing && (
        <p className="text-center text-slate-400 text-sm animate-pulse">
          🎙 现在跟读，完成后点"下一句"
        </p>
      )}

      <div className="text-center text-slate-600 text-xs">
        {segIndex + 1} / {pack.segments.length}
      </div>
    </div>
  )
}
