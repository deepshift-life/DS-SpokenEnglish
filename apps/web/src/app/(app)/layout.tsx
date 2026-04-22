import { StoreHydration } from '@/components/StoreHydration'
import { PageTransition } from '@/components/PageTransition'
import { BottomNav } from '@/components/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <StoreHydration />
      <PageTransition>
        <div className="pb-20">{children}</div>
      </PageTransition>
      <BottomNav />
    </div>
  )
}
