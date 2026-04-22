import { BaiduQRLogin } from '@/components/BaiduQRLogin'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">DS速通英语</h1>
        <p className="text-slate-400">以说为目的，打破哑巴英语</p>
      </div>
      <BaiduQRLogin />
    </main>
  )
}
