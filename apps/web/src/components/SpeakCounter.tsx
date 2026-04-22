'use client'

import { useEffect, useState } from 'react'
import { useProgressStore } from '@/store/progress'

export function SpeakCounter() {
  const [hydrated, setHydrated] = useState(false)
  const count = useProgressStore(s => s.progress?.stats.totalSpeakCount ?? 0)
  const streak = useProgressStore(s => s.progress?.stats.streakDays ?? 0)

  useEffect(() => { setHydrated(true) }, [])

  if (!hydrated) {
    return (
      <section className="text-center py-8">
        <p className="text-slate-400 text-sm mb-1">今日已开口</p>
        <p className="text-7xl font-bold text-slate-700 tabular-nums leading-none">—</p>
        <p className="text-slate-400 text-sm mt-1">次</p>
      </section>
    )
  }

  return (
    <section className="text-center py-8">
      <p className="text-slate-400 text-sm mb-1">今日已开口</p>
      <p className="text-7xl font-bold text-emerald-400 tabular-nums leading-none">{count}</p>
      <p className="text-slate-400 text-sm mt-1">次</p>
      {streak > 0 && (
        <p className="text-slate-500 text-xs mt-3">连续学习 {streak} 天</p>
      )}
    </section>
  )
}
