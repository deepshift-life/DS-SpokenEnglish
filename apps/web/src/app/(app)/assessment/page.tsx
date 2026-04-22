import { AssessmentFlow } from '@/components/AssessmentFlow'

export default function AssessmentPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">快速测评</h1>
      <p className="text-slate-400 text-sm mb-8">10 题，约 3 分钟，帮你找到最适合的起点</p>
      <AssessmentFlow />
    </main>
  )
}
