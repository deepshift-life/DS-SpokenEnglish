'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { LearningUnit, SpeechScore } from '@ds/types'
import { startRecording, formatTime } from '@ds/audio'
import type { RecordingHandle } from '@ds/audio'
import { ScoreRing, VolumeBar, Button } from '@ds/ui'
import { useProgressStore } from '@/store/progress'

const ROUNDS = [4, 3, 2, 1]

interface Props {
  unit: LearningUnit
  onNext: () => void
}

type RoundState = 'idle' | 'recording' | 'scoring' | 'done'

export function StepOutput({ unit, onNext }: Props) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [roundState, setRoundState] = useState<RoundState>('idle')
  const [secondsLeft, setSecondsLeft] = useState(ROUNDS[0] * 60)
  const [score, setScore] = useState<SpeechScore | null>(null)
  const [volume, setVolume] = useState(0)
  const recHandleRef = useRef<RecordingHandle | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const volRafRef = useRef<number>(0)
  const recordSpeak = useProgressStore(s => s.recordSpeak)

  const minutes = ROUNDS[roundIndex]
  const isLastRound = roundIndex === ROUNDS.length - 1

  useEffect(() => {
    setSecondsLeft(minutes * 60)
  }, [roundIndex, minutes])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      cancelAnimationFrame(volRafRef.current)
      recHandleRef.current?.stop().catch(() => {})
    }
  }, [])

  const stopRound = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(volRafRef.current)
    setVolume(0)
    recordSpeak()
    setRoundState('scoring')

    let blob: Blob | null = null
    if (recHandleRef.current) {
      try {
        const result = await recHandleRef.current.stop()
        blob = result.blob
      } catch { /* mic was denied */ }
      recHandleRef.current = null
    }

    if (blob && blob.size > 0) {
      try {
        const fd = new FormData()
        fd.append('audio', blob, 'recording.webm')
        fd.append('refText', unit.chunks.map(c => c.text).join('. '))
        const res = await fetch('/api/score', { method: 'POST', body: fd })
        if (res.ok) setScore(await res.json())
      } catch { /* scoring failed silently */ }
    }
    setRoundState('done')
  }, [recordSpeak, unit.chunks])

  async function startRound() {
    setScore(null)
    setRoundState('recording')

    try {
      const handle = await startRecording()
      recHandleRef.current = handle

      // Poll volume via rAF
      const pollVolume = () => {
        setVolume(handle.getVolume())
        volRafRef.current = requestAnimationFrame(pollVolume)
      }
      volRafRef.current = requestAnimationFrame(pollVolume)
    } catch {
      // mic denied — continue without recording
    }

    const totalSeconds = minutes * 60
    setSecondsLeft(totalSeconds)
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          stopRound()
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  function nextRound() {
    if (isLastRound) {
      onNext()
    } else {
      setRoundIndex(i => i + 1)
      setRoundState('idle')
      setScore(null)
    }
  }

  const progress = secondsLeft / (minutes * 60)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-1">Step 3 · 开口说</p>
        <p className="text-white font-semibold">
          第 {roundIndex + 1} 轮 / 共 4 轮 &nbsp;·&nbsp; {minutes} 分钟
        </p>
      </div>

      {/* Chunk prompt */}
      <div className="w-full bg-slate-800 rounded-2xl p-5">
        <p className="text-slate-400 text-xs mb-2">用这些短语，围绕场景自由说：</p>
        <div className="flex flex-wrap gap-2">
          {unit.chunks.map(c => (
            <span key={c.id} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-white">
              {c.text}
            </span>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-3">说错没关系，不停顿，一直说</p>
      </div>

      {/* Timer ring */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle cx="50" cy="50" r="44" fill="none"
            stroke={roundState === 'recording' ? '#10b981' : '#334155'}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress)}`}
            strokeLinecap="round"
            className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          {roundState === 'scoring' ? (
            <span className="text-slate-400 text-sm animate-pulse">评分中…</span>
          ) : (
            <>
              <span className="text-3xl font-bold tabular-nums text-white">
                {formatTime(secondsLeft)}
              </span>
              {roundState === 'recording' && <VolumeBar volume={volume} />}
            </>
          )}
        </div>
      </div>

      {/* Score */}
      {score && roundState === 'done' && (
        <div className="w-full bg-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-xs mb-4 text-center">本轮发音评分</p>
          <div className="flex justify-around">
            <ScoreRing value={score.fluency} label="流利度" />
            <ScoreRing value={score.accuracy} label="准确度" />
            <ScoreRing value={score.completeness} label="完整度" />
            <ScoreRing value={score.overall} label="综合" />
          </div>
          {(score as SpeechScore & { mock?: boolean }).mock && (
            <p className="text-slate-600 text-[10px] text-center mt-3">
              演示数据，配置讯飞 API 后显示真实评分
            </p>
          )}
        </div>
      )}

      {roundState === 'idle' && (
        <Button size="lg" onClick={startRound}>开始说</Button>
      )}

      {roundState === 'recording' && (
        <Button size="lg" variant="danger" onClick={stopRound}>提前结束这轮</Button>
      )}

      {roundState === 'scoring' && (
        <div className="w-full py-4 rounded-2xl bg-slate-700 text-slate-400 font-semibold text-lg text-center">
          评分中…
        </div>
      )}

      {roundState === 'done' && (
        <Button size="lg" onClick={nextRound}>
          {isLastRound ? '完成！查看结果 →' : `下一轮 (${ROUNDS[roundIndex + 1]}分钟) →`}
        </Button>
      )}
    </div>
  )
}
