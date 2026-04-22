'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useProgressStore } from '@/store/progress'

export function ReviewBadge() {
  const [count, setCount] = useState(0)
  const getDueReviews = useProgressStore(s => s.getDueReviews)

  useEffect(() => {
    const update = () => setCount(getDueReviews().length)
    update()
    return useProgressStore.subscribe(update)
  }, [getDueReviews])

  if (count === 0) return null

  return (
    <Link
      href="/review"
      className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-2xl px-4 py-3 mb-6 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">🔔</span>
        <div>
          <p className="text-amber-300 font-medium text-sm">有 {count} 个短语块待复习</p>
          <p className="text-amber-500/70 text-xs">趁记忆还新鲜，现在复习效果最好</p>
        </div>
      </div>
      <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
