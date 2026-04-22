import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DS速通英语',
  description: '以说为目的，打破哑巴英语',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
