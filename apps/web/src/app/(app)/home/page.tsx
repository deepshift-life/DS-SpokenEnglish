import { SpeakCounter } from '@/components/SpeakCounterClient'
import { DailyTaskList } from '@/components/DailyTaskList'
import { ReviewBadge } from '@/components/ReviewBadge'
import { DAILY_UNITS } from '@/lib/content'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <SpeakCounter />

      <ReviewBadge />

      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">今日任务</h2>
          <span className="text-xs text-slate-500">{DAILY_UNITS.length} 个单元</span>
        </div>
        <DailyTaskList units={DAILY_UNITS} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">快速入口</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/conversation" className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors">
            <p className="text-2xl mb-1">💬</p>
            <p className="font-medium text-sm">AI 对话练习</p>
            <p className="text-xs text-slate-500 mt-0.5">真实场景英语对话</p>
          </Link>
          <Link href="/library" className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors">
            <p className="text-2xl mb-1">🗂</p>
            <p className="font-medium text-sm">场景库</p>
            <p className="text-xs text-slate-500 mt-0.5">按场景自由练习</p>
          </Link>
          <Link href="/resources" className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors">
            <p className="text-2xl mb-1">📁</p>
            <p className="font-medium text-sm">我的资源</p>
            <p className="text-xs text-slate-500 mt-0.5">导入视频生成练习</p>
          </Link>
          <Link href="/profile" className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 transition-colors">
            <p className="text-2xl mb-1">📊</p>
            <p className="font-medium text-sm">我的进度</p>
            <p className="text-xs text-slate-500 mt-0.5">流利度曲线 & 连续天数</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
