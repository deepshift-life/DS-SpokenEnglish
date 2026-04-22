'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { ShadowingPack } from '@ds/types'
import { Button, Card } from '@ds/ui'

// Demo packs — loaded from IndexedDB on mount

export function ResourcesClient() {
  const [packs, setPacks] = useState<ShadowingPack[]>([])

  useEffect(() => {
    import('@ds/db').then(({ getAllPacks }) => getAllPacks()).then(setPacks).catch(() => {})
  }, [])
  const [generating, setGenerating] = useState(false)
  const [status, setStatus] = useState('')

  async function handleGenerate() {
    setGenerating(true)
    setStatus('正在处理音频，请稍候…')
    // Placeholder — real flow: pick file from Baidu → Whisper transcribe → segment → save pack
    await new Promise(r => setTimeout(r, 1500))
    setStatus('功能开发中，需要配置百度网盘 API 和 Whisper API')
    setGenerating(false)
  }

  return (
    <div className="space-y-6">
      {/* Upload CTA */}
      <Card className="border border-dashed border-slate-600">
        <div className="text-center">
          <p className="text-4xl mb-3">📁</p>
          <p className="text-white font-medium mb-1">从百度网盘导入</p>
          <p className="text-slate-400 text-sm mb-4">
            选择视频或音频文件，AI 自动转写并生成 Shadowing 练习包
          </p>
          <Button loading={generating} onClick={handleGenerate}>
            {generating ? '处理中…' : '选择文件'}
          </Button>
          {status && <p className="text-slate-500 text-xs mt-3">{status}</p>}
        </div>
      </Card>

      {/* Flow explanation */}
      <Card>
        <p className="text-white font-medium text-sm mb-3">处理流程</p>
        <div className="space-y-2">
          {[
            ['📥', '从百度网盘选择视频/音频'],
            ['🎙', 'Whisper AI 自动转写字幕'],
            ['✂️', '按句子切割成片段'],
            ['🔁', '生成 Shadowing 练习包'],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Pack list */}
      {packs.length > 0 ? (
        <div>
          <p className="text-slate-400 text-xs mb-3">已生成的练习包</p>
          <div className="space-y-3">
            {packs.map(pack => (
              <Link
                key={pack.id}
                href={`/shadowing/${pack.id}`}
                className="flex items-center gap-4 bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-lg">🎬</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{pack.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{pack.segments.length} 个片段</p>
                </div>
                <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-slate-600 text-sm">还没有练习包，导入第一个视频开始吧</p>
        </div>
      )}

      {/* Login prompt */}
      <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
        <p className="text-slate-400 text-xs text-center">
          需要登录百度网盘才能访问你的文件 ·{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300">去登录</Link>
        </p>
      </div>
    </div>
  )
}
