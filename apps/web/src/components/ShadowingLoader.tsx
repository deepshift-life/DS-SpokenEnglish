'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import type { ShadowingPack } from '@ds/types'
import { ShadowingPlayer } from './ShadowingPlayer'
import { Spinner } from '@ds/ui'

const DEMO_PACK: ShadowingPack = {
  id: 'demo',
  title: '示例 Shadowing 包',
  sourceUrl: '',
  createdAt: new Date().toISOString(),
  segments: [
    { index: 0, startTime: 0,  endTime: 3,  text: "Hi, can I get a table for two?",          audioUrl: '' },
    { index: 1, startTime: 3,  endTime: 6,  text: "Sure, right this way.",                    audioUrl: '' },
    { index: 2, startTime: 6,  endTime: 10, text: "Could I see the menu, please?",            audioUrl: '' },
    { index: 3, startTime: 10, endTime: 14, text: "Today's special is the salmon.",           audioUrl: '' },
    { index: 4, startTime: 14, endTime: 18, text: "That sounds great. I'll have that.",       audioUrl: '' },
  ],
}

interface Props {
  packId: string
}

export function ShadowingLoader({ packId }: Props) {
  const [pack, setPack] = useState<ShadowingPack | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (packId === 'demo') {
      setPack(DEMO_PACK)
      setLoading(false)
      return
    }

    import('@ds/db').then(({ getPack }) => getPack(packId)).then(p => {
      setPack(p ?? null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [packId])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="text-emerald-400" />
      </div>
    )
  }

  if (!pack) {
    notFound()
    return null
  }

  return <ShadowingPlayer pack={pack} />
}
