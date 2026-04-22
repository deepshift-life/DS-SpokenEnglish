'use client'

import { useEffect, useState } from 'react'
import { Spinner } from '@ds/ui'

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
    // Baidu OAuth doesn't provide a QR code API directly —
    // we open the auth URL in a popup and listen for the redirect.
    setStatus('ready')
  }, [])

  function handleLogin() {
    const url = authUrl()
    const popup = window.open(url, 'baidu-auth', 'width=500,height=600')
    if (!popup) return

    setStatus('scanned')

    // Poll for popup close (redirect back sets cookie via API route)
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer)
        // Reload to trigger middleware auth check
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

      <a href="/home" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
        暂不登录，直接开始 →
      </a>
    </div>
  )
}
