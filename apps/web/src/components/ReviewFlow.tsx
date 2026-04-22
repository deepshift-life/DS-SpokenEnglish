'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProgressStore } from '@/store/progress'
import { speakText } from '@ds/audio'
import type { ReviewItem } from '@ds/types'
import { DAILY_UNITS } from '@/lib/content'
import { Button, ProgressBar } from '@ds/ui'

type CardState = 'question' | 'answer'

function getChunk(item: ReviewItem) {
  for (const unit of DAILY_UNITS) {
    const chunk = unit.chunks.find(c => c.id === item.chunkId)
    if (chunk) return { chunk, unit }
  }
  return null
}

export function ReviewFlow() {
  const router = useRouter()
  const getDueReviews = useProgressStore(s => s.getDueReviews)
  const advanceReview = useProgressStore(s => s.advanceReview)
  const [queue, setQueue] = useState<ReviewItem[]>([])
  const [index, setIndex] = useState(0)
  const [cardState, setCardState] = useState<CardState>('question')
  const [done, setDone] = useState(false)
  const [correct, setCorrect] = useState(0)

  useEffect(() => {
    useProgressStore.persist.rehydrate()
    const due = getDueReviews()
    setQueue(due)
    if (due.length === 0) setDone(true)
  }, [getDueReviews])

  const item = queue[index]
  const found = item ? getChunk(item) : null

  function handleResult(remembered: boolean) {
    if (!item) return
    if (remembered) {
      advanceReview(item.unitId, item.chunkId)
      setCorrect(c => c + 1)
    }
    if (index + 1 >= queue.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setCardState('question')
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-8">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-4xl">✅</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">复习完成</p>
          <p className="text-slate-400 text-sm">
            {queue.length > 0
              ? `${correct} / ${queue.length} 记住了`
              : '今天没有待复习的短语块'}
          </p>
        </div>
        <Button size="lg" onClick={() => router.push('/home')}>回首页</Button>
      </div>
    )
  }

  if (!found) return null

  const { chunk, unit } = found

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <ProgressBar steps={queue.length} current={index} />
      <p className="text-slate-500 text-xs text-center">{index + 1} / {queue.length}</p>

      {/* Card */}
      <div
        className="w-full bg-slate-800 rounded-2xl p-8 text-center min-h-[180px] flex flex-col items-center justify-center gap-4 cursor-pointer"
        onClick={() => cardState === 'question' && setCardState('answer')}
      >
        {cardState === 'question' ? (
          <>
            <p className="text-slate-400 text-sm">{unit.scene}</p>
            <p className="text-3xl font-semibold text-white">{chunk.text}</p>
            <p className="text-slate-500 text-sm mt-2">点击查看用法</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-semibold text-white">{chunk.text}</p>
            <p className="text-slate-400 text-sm">{chunk.scene}</p>
            <button
              onClick={e => { e.stopPropagation(); speakText(chunk.text) }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              听一遍
            </button>
          </>
        )}
      </div>

      {/* Mastery buttons */}
      {cardState === 'answer' && (
        <div className="flex gap-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={() => handleResult(false)}>还没记住</Button>
          <Button size="lg" className="flex-1" onClick={() => handleResult(true)}>记住了 ✓</Button>
        </div>
      )}

      {cardState === 'question' && (
        <Button variant="secondary" size="lg" onClick={() => setCardState('answer')}>查看用法</Button>
      )}
    </div>
  )
}
