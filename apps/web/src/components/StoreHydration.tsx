'use client'

import { useEffect } from 'react'
import { useProgressStore } from '@/store/progress'
import { useProgressSync } from '@/hooks/useProgressSync'

export function StoreHydration() {
  useEffect(() => {
    useProgressStore.persist.rehydrate()
  }, [])
  useProgressSync()
  return null
}
