'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Spinner } from '@ds/ui'
import { IS_STATIC_PREVIEW, STATIC_PREVIEW_NOTICE } from '@/lib/static-preview'

type QRStatus = 'loading' | 'ready' | 'scanned' | 'expired' | 'error'

export function BaiduQRLogin() {
  const [status, setStatus] = useState<QRStatus>('loading')

  const authUrl = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_BAIDU_APP_KEY ?? '',
      redirect_uri: `${window.location.origin}/api/baidu/callback`,
      scope: 'basic,netdisk',
      display: 'popup',
    })
    return `https://openapi.baidu.com/oauth/2.0/authorize?${params}`
  }

  useEffect(() => {
    if (IS_STATIC_PREVIEW) return
    setStatus('ready')
  }, [])

  if (IS_STATIC_PREVIEW) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="w-56 rounded-2xl bg-slate-800 border border-slate-700 p-6 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <p className="text-white font-medium mb-2">静态预览模式</p>
          <p className="text-slate-400 text-sm leading-relaxed">{STATIC_PREVIEW_NOTICE}</p>
        </div>
        <Link
          href="/home"
          className="w-56 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-center transition-colors"
        >
          直接开始
        </Link>
      </div>
    )
  }

  function handleLogin() {
    const url = authUrl()
    const popup = window.open(url, 'baidu-auth', 'width=500,height=600')
    if (!popup) return

    setStatus('scanned')

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer)
        window.location.href = '/home'
      }
    }, 500)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-56 h-56 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center gap-3">
        {status === 'loading' && (
          <Spinner className="text-emerald-400" />
        )}
        {(status === 'ready' || status === 'scanned') && (
          <>
            <svg className="w-16 h-16 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 7a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM13 7a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V7zM3 17a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
            </svg>
            <p className="text-slate-400 text-sm text-center px-4">
              {status === 'scanned' ? '等待授权确认...' : '点击下方按钮登录'}
            </p>
          </>
        )}
      </div>

      <button
        onClick={handleLogin}
        disabled={status === 'scanned'}
        className="w-56 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium transition-colors"
      >
        {status === 'scanned' ? '授权中...' : '百度网盘授权登录'}
      </button>

      <p className="text-slate-600 text-xs">登录即可同步学习进度</p>

      <Link href="/home" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
        暂不登录，直接开始 →
      </Link>
    </div>
  )
}
