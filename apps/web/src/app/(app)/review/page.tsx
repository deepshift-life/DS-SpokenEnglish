import { ReviewFlow } from '@/components/ReviewFlow'

export default function ReviewPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">间隔复习</h1>
      <p className="text-slate-400 text-sm mb-8">记住了就往后推，没记住明天再来</p>
      <ReviewFlow />
    </main>
  )
}
