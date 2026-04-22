import { ResourcesClient } from '@/components/ResourcesClient'

export default function ResourcesPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">我的资源</h1>
      <p className="text-slate-400 text-sm mb-6">从百度网盘导入视频/音频，自动生成 Shadowing 练习</p>
      <ResourcesClient />
    </main>
  )
}
