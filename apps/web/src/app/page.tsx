import Link from 'next/link'

export default function RootPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16 flex items-center justify-center">
      <section className="max-w-md text-center">
        <p className="text-5xl mb-5">🎙️</p>
        <h1 className="text-3xl font-bold mb-3">DS Spoken English</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          面向口语输出的英语练习应用。GitHub Pages 预览版可体验内置单元、跟读、复习和本地进度。
        </p>
        <Link
          href="/home"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
        >
          进入预览
        </Link>
      </section>
    </main>
  )
}
