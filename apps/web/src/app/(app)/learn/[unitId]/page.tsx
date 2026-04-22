import { LearnUnitLoader } from '@/components/learn/LearnUnitLoader'

interface Props {
  params: Promise<{ unitId: string }>
}

export default async function LearnUnitPage({ params }: Props) {
  const { unitId } = await params
  return <LearnUnitLoader unitId={unitId} />
}
