import { ShadowingLoader } from '@/components/ShadowingLoader'

interface Props {
  params: Promise<{ packId: string }>
}

export default async function ShadowingPage({ params }: Props) {
  const { packId } = await params
  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <ShadowingLoader packId={packId} />
    </main>
  )
}
