'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DAILY_UNITS } from '@/lib/content'
import type { LearningUnit } from '@ds/types'
import { useProgressStore } from '@/store/progress'

const SCENES = [
  { id: 'daily', label: '日常生活', emoji: '🏠', prompt: '日常生活场景，如购物、问路、邻居闲聊' },
  { id: 'work', label: '职场英语', emoji: '💼', prompt: '职场场景，如会议发言、汇报进度、和同事沟通' },
  { id: 'travel', label: '旅行出行', emoji: '✈️', prompt: '旅行场景，如机场值机、酒店入住、问路' },
  { id: 'social', label: '社交闲聊', emoji: '🤝', prompt: '社交场景，如自我介绍、聊爱好、认识新朋友' },
  { id: 'emergency', label: '紧急情况', emoji: '🆘', prompt: '紧急场景，如寻求帮助、看医生、报告问题' },
  { id: 'tech', label: '科技数码', emoji: '💻', prompt: '科技场景，如讨论产品、技术问题、AI工具' },
]

export default function LibraryPage() {
  const router = useRouter()
  const level = useProgressStore(s => s.progress?.level ?? 'beginner')
  const [generating, setGenerating] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleSceneClick(scene: typeof SCENES[0]) {
    setGenerating(scene.id)
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scene: scene.prompt, level }),
      })
      if (!res.ok) throw new Error('生成失败')
      const { unit } = await res.json() as { unit: LearningUnit }
      // Store generated unit in sessionStorage so the learn page can pick it up
      sessionStorage.setItem(`gen-unit-${unit.id}`, JSON.stringify(unit))
      router.push(`/learn/${unit.id}`)
    } catch {
      setError(`生成"${scene.label}"单元失败，请检查 ANTHROPIC_API_KEY 配置`)
    } finally {
      setGenerating(null)
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">场景库</h1>
      <p className="text-slate-400 text-sm mb-6">选择场景，AI 即时生成专属练习单元</p>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Scene categories — AI generate on click */}
      <section className="mb-8">
        <h2 className="text-sm font-medium text-slate-400 mb-3">AI 生成练习</h2>
        <div className="grid grid-cols-2 gap-3">
          {SCENES.map(s => {
            const isLoading = generating === s.id
            return (
              <button
                key={s.id}
                onClick={() => handleSceneClick(s)}
                disabled={!!generating}
                className="bg-slate-800 rounded-2xl p-4 text-left hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <p className="text-2xl mb-2">{isLoading ? '⏳' : s.emoji}</p>
                <p className="font-medium text-sm text-white">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isLoading ? 'AI 生成中…' : '点击生成单元'}
                </p>
              </button>
            )
          })}
        </div>
        <p className="text-slate-600 text-xs mt-3 text-center">需要配置 ANTHROPIC_API_KEY</p>
      </section>

      {/* Built-in units */}
      <section>
        <h2 className="text-sm font-medium text-slate-400 mb-3">内置单元</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
          {DAILY_UNITS.map(unit => (
            <Link
              key={unit.id}
              href={`/learn/${unit.id}`}
              className="flex items-center gap-4 bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 text-lg">🎯</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-white truncate">{unit.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{unit.scene} · {unit.chunks.length} 个短语块</p>
              </div>
              <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* AI conversation shortcut */}
      <section className="mt-6">
        <Link
          href="/conversation"
          className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-2xl p-4 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-400 text-lg">💬</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-white">AI 自由对话</p>
            <p className="text-xs text-slate-400 mt-0.5">选场景，和 AI 用英语聊</p>
          </div>
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </main>
  )
}
