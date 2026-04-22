'use client'

import { useEffect, useState } from 'react'
import { useProgressStore } from '@/store/progress'
import type { FluencyRecord } from '@ds/types'
import Link from 'next/link'
import { Card } from '@ds/ui'

function FluencyCurve({ records }: { records: FluencyRecord[] }) {
  if (records.length < 2) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-slate-600 text-sm">完成更多单元后显示流利度曲线</p>
      </div>
    )
  }

  const W = 300, H = 100, PAD = 8
  const scores = records.map(r => r.score)
  const min = Math.max(0, Math.min(...scores) - 10)
  const max = Math.min(100, Math.max(...scores) + 10)
  const range = max - min || 1

  const pts = records.map((r, i) => {
    const x = PAD + (i / (records.length - 1)) * (W - PAD * 2)
    const y = H - PAD - ((r.score - min) / range) * (H - PAD * 2)
    return `${x},${y}`
  })

  const latest = scores[scores.length - 1]
  const prev = scores[scores.length - 2]
  const delta = latest - prev
  const color = delta >= 0 ? '#10b981' : '#f59e0b'

  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-3xl font-bold text-white">{latest}</span>
        <span className={`text-sm font-medium ${delta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
          {delta >= 0 ? '+' : ''}{delta} 较上次
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24">
        {/* Grid lines */}
        {[0, 0.5, 1].map(t => (
          <line key={t}
            x1={PAD} y1={PAD + t * (H - PAD * 2)}
            x2={W - PAD} y2={PAD + t * (H - PAD * 2)}
            stroke="#1e293b" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <defs>
          <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${PAD},${H - PAD} ${pts.join(' ')} ${W - PAD},${H - PAD}`}
          fill="url(#curve-fill)" />
        {/* Line */}
        <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots */}
        {pts.map((pt, i) => {
          const [x, y] = pt.split(',').map(Number)
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />
        })}
      </svg>
      <div className="flex justify-between text-slate-600 text-[10px] mt-1">
        <span>{records[0].date}</span>
        <span>{records[records.length - 1].date}</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <Card>
      <span className="text-slate-400 text-xs">{label}</span>
      <span className="text-3xl font-bold text-white block mt-1">{value}</span>
      {sub && <span className="text-slate-500 text-xs">{sub}</span>}
    </Card>
  )
}

export function ProfileStats() {
  const [hydrated, setHydrated] = useState(false)
  const progress = useProgressStore(s => s.progress)

  useEffect(() => { setHydrated(true) }, [])

  const stats = progress.stats
  const totalSpeaks = hydrated ? stats.totalSpeakCount : 0
  const streak = hydrated ? stats.streakDays : 0
  const completed = hydrated ? progress.completedUnits.length : 0
  const reviewDue = hydrated ? progress.reviewQueue.filter(r => r.nextReviewDate <= new Date().toISOString().split('T')[0]).length : 0
  const fluencyHistory = hydrated ? (stats.fluencyHistory ?? []) : []

  const levelLabel: Record<string, string> = {
    beginner: '初级', intermediate: '中级', advanced: '高级',
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="累计开口次数" value={totalSpeaks} sub="每轮 4-3-2-1 计 4 次" />
        <StatCard label="连续学习天数" value={streak} sub="天" />
        <StatCard label="完成单元数" value={completed} sub="个场景单元" />
        <StatCard label="当前级别" value={levelLabel[progress.level] ?? progress.level} />
      </div>

      {/* Fluency curve */}
      <Card>
        <p className="text-slate-400 text-xs mb-4">流利度曲线</p>
        <FluencyCurve records={fluencyHistory} />
      </Card>

      {/* Streak bar */}
      <Card>
        <p className="text-slate-400 text-xs mb-3">本周学习</p>
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i}
              className={`flex-1 h-2 rounded-full ${i < (streak % 7 || (streak >= 7 ? 7 : 0)) ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-2">
          {streak > 0 ? `已连续 ${streak} 天，继续保持！` : '今天开始第一天'}
        </p>
      </Card>

      {/* Review queue */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs mb-1">待复习短语块</p>
            <p className="text-2xl font-bold text-white">{reviewDue}</p>
          </div>
          {reviewDue > 0 && (
            <Link href="/review"
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/30 transition-colors">
              去复习
            </Link>
          )}
        </div>
      </Card>
    </div>
  )
}
