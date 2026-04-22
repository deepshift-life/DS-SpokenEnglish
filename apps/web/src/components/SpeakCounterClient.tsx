'use client'

import dynamic from 'next/dynamic'

// Disable SSR — zustand persist reads localStorage which doesn't exist server-side
const SpeakCounter = dynamic(
  () => import('@/components/SpeakCounter').then(m => m.SpeakCounter),
  { ssr: false, loading: () => (
    <section className="text-center py-8">
      <p className="text-slate-400 text-sm mb-1">今日已开口</p>
      <p className="text-7xl font-bold text-slate-700 tabular-nums leading-none">—</p>
      <p className="text-slate-400 text-sm mt-1">次</p>
    </section>
  )}
)

export { SpeakCounter }
