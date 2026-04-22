'use client'

import { useEffect, useRef } from 'react'
import { useProgressStore } from '@/store/progress'
import type { UserProgress } from '@ds/types'
import { IS_STATIC_PREVIEW } from '@/lib/static-preview'

// Pulls cloud progress on mount, merges with local (Last-Write-Wins by updatedAt).
// Pushes local progress to cloud whenever it changes (debounced 5s).
export function useProgressSync() {
  const store = useProgressStore()
  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didPullRef = useRef(false)

  // Pull on mount
  useEffect(() => {
    if (IS_STATIC_PREVIEW) return
    if (didPullRef.current) return
    didPullRef.current = true

    async function pull() {
      try {
        const res = await fetch('/api/baidu/sync')
        if (!res.ok) return
        const { progress: cloud } = await res.json() as { progress: UserProgress | null }
        if (!cloud) return

        const local = useProgressStore.getState().progress
        // Last-Write-Wins: keep whichever was updated more recently
        if (!local.updatedAt || cloud.updatedAt > local.updatedAt) {
          useProgressStore.getState().loadProgress(cloud)
        }
      } catch {
        // offline or not logged in — silently skip
      }
    }

    pull()
  }, [])

  // Push on change (debounced)
  useEffect(() => {
    if (IS_STATIC_PREVIEW) return
    const unsub = useProgressStore.subscribe(state => {
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current)
      pushTimerRef.current = setTimeout(async () => {
        try {
          await fetch('/api/baidu/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress: state.progress }),
          })
        } catch { /* offline — skip */ }
      }, 5000)
    })
    return () => {
      unsub()
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current)
    }
  }, [store])
}
