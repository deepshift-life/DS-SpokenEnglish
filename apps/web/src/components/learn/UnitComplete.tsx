'use client'

import Link from 'next/link'
import type { LearningUnit } from '@ds/types'
import { useProgressStore } from '@/store/progress'
import { useEffect, useState } from 'react'

interface Props {
  unit: LearningUnit
}

export function UnitComplete({ unit }: Props) {
  const completeUnit = useProgressStore(s => s.completeUnit)
  const addToReviewQueue = useProgressStore(s => s.addToReviewQueue)
  const speakCount = useProgressStore(s => s.progress.stats.totalSpeakCount)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  useEffect(() => {
    completeUnit(unit.id)
    // Add all chunks to spaced review queue
    const tomorrow = (() => {
      const d = new Date(); d.setDate(d.getDate() + 1)
      return d.toISOString().split('T')[0]
    })()
    unit.chunks.forEach(chunk => {
      addToReviewQueue({
        unitId: unit.id,
        chunkId: chunk.id,
        masteryLevel: 1,
        nextReviewDate: tomorrow,
        reviewCount: 0,
      })
    })
  }, [unit.id, unit.chunks, completeUnit, addToReviewQueue])

  return (
    <div className="flex flex-col items-center gap-8 text-center py-8">
      <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">说出来了！</h2>
        <p className="text-slate-400">今日累计开口 <span className="text-emerald-400 font-bold">{hydrated ? speakCount : '—'}</span> 次</p>
      </div>

      <div className="w-full bg-slate-800 rounded-2xl p-5 text-left">
        <p className="text-slate-400 text-sm mb-3">已加入间隔复习 · {unit.chunks.length} 个短语块</p>
        {unit.chunks.map(c => (
          <div key={c.id} className="py-2 border-b border-slate-700 last:border-0">
            <p className="text-white text-sm">{c.text}</p>
            <p className="text-slate-500 text-xs mt-0.5">{c.scene}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 w-full">
        <Link href="/home"
          className="flex-1 py-4 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors text-center">
          回首页
        </Link>
        <Link href="/library"
          className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors text-center">
          继续练习
        </Link>
      </div>
    </div>
  )
}
