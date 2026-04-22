'use client'

import { useState, useRef } from 'react'
import type { LearningUnit } from '@ds/types'
import { playAudio, speakText } from '@ds/audio'
import type { PlaybackHandle } from '@ds/audio'
import { Button } from '@ds/ui'

interface Props {
  unit: LearningUnit
  onNext: () => void
}

export function StepListen({ unit, onNext }: Props) {
  const [phase, setPhase] = useState<'listen' | 'shadow'>('listen')
  const [playing, setPlaying] = useState(false)
  const [noAudio, setNoAudio] = useState(false)
  const handleRef = useRef<PlaybackHandle | null>(null)

  async function togglePlay() {
    if (playing) {
      handleRef.current?.pause()
      setPlaying(false)
      return
    }
    handleRef.current?.stop()
    setPlaying(true)

    const onEnd = () => {
      setPlaying(false)
      if (phase === 'listen') setPhase('shadow')
    }

    if (unit.audioUrl) {
      handleRef.current = playAudio(unit.audioUrl, onEnd)
      setTimeout(() => {
        if (handleRef.current && handleRef.current.duration === 0 && !handleRef.current.ended) {
          handleRef.current = null
          // fall through to TTS
          speakText(unit.dialogueText, onEnd).then(h => { handleRef.current = h })
        }
      }, 800)
    } else {
      // No audio file — use TTS directly
      const h = await speakText(unit.dialogueText, onEnd)
      handleRef.current = h
      if (!h) { setPlaying(false); setNoAudio(true); if (phase === 'listen') setPhase('shadow') }
    }
  }

  const lines = unit.dialogueText.split('\n').filter(Boolean)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-1">
          {phase === 'listen' ? 'Step 1 · 先听一遍' : 'Step 1 · 跟读一遍'}
        </p>
        <h1 className="text-2xl font-bold">{unit.title}</h1>
        <p className="text-slate-500 text-sm mt-1">{unit.scene}</p>
      </div>

      {/* Dialogue */}
      <div className="w-full bg-slate-800 rounded-2xl p-5 space-y-2">
        {lines.map((line, i) => (
          <p key={i} className={`text-sm leading-relaxed ${i % 2 === 0 ? 'text-white' : 'text-slate-300'}`}>
            {line}
          </p>
        ))}
      </div>

      {/* Phase hint */}
      {phase === 'shadow' && !noAudio && (
        <div className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-4 py-3 text-center">
          <p className="text-emerald-300 text-sm font-medium">跟读阶段</p>
          <p className="text-emerald-500/70 text-xs mt-0.5">播放音频，跟着大声朗读每一句</p>
        </div>
      )}

      {/* Play button */}
      <button
        onClick={togglePlay}
        disabled={noAudio}
        className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/40"
      >
        {playing ? (
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {noAudio && (
        <p className="text-slate-500 text-xs text-center">语音合成不可用，可直接阅读对话文本</p>
      )}

      {!noAudio && !playing && phase === 'listen' && (
        <p className="text-slate-500 text-sm text-center">听完后自动进入跟读</p>
      )}

      {(phase === 'shadow' || noAudio) && (
        <Button size="lg" onClick={onNext}>继续 →</Button>
      )}
    </div>
  )
}
