'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { DAILY_UNITS } from '@/lib/content'
import { LearnUnit } from '@/components/learn/LearnUnit'
import type { LearningUnit } from '@ds/types'

interface Props {
  unitId: string
}

export function LearnUnitLoader({ unitId }: Props) {
  const [unit, setUnit] = useState<LearningUnit | null | 'not-found'>(() => {
    // Try static content first (synchronous)
    return DAILY_UNITS.find(u => u.id === unitId) ?? null
  })

  useEffect(() => {
    if (unit !== null) return
    // Try sessionStorage for AI-generated units
    const stored = sessionStorage.getItem(`gen-unit-${unitId}`)
    if (stored) {
      try {
        setUnit(JSON.parse(stored))
        return
      } catch { /* fall through */ }
    }
    setUnit('not-found')
  }, [unitId, unit])

  if (unit === null) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-slate-400 text-sm animate-pulse">加载中…</p>
    </div>
  )

  if (unit === 'not-found') return notFound()

  return <LearnUnit unit={unit} />
}
