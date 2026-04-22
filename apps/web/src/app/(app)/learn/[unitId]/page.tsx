import { LearnUnitLoader } from '@/components/learn/LearnUnitLoader'
import { DAILY_UNITS } from '@/lib/content'

interface Props {
  params: Promise<{ unitId: string }>
}

export function generateStaticParams() {
  return DAILY_UNITS.map(unit => ({ unitId: unit.id }))
}

export default async function LearnUnitPage({ params }: Props) {
  const { unitId } = await params
  return <LearnUnitLoader unitId={unitId} />
}
