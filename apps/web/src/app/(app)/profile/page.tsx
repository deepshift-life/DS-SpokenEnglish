import { ProfileStats } from '@/components/ProfileStats'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">我的进度</h1>
        <Link href="/assessment" className="text-sm text-emerald-400 hover:text-emerald-300">
          重新测级
        </Link>
      </div>
      <ProfileStats />
    </main>
  )
}
