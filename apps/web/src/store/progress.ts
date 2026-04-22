import { create } from 'zustand'
import { persist, type StorageValue } from 'zustand/middleware'
import type { UserProgress, Level, ReviewItem } from '@ds/types'
import { advanceMastery, isDueForReview } from '@ds/core'

interface ProgressStore {
  progress: UserProgress
  setLevel: (level: Level) => void
  completeUnit: (unitId: string) => void
  recordSpeak: () => void
  getDueReviews: () => ReviewItem[]
  addToReviewQueue: (item: ReviewItem) => void
  advanceReview: (unitId: string, chunkId: string) => void
  loadProgress: (p: UserProgress) => void
}

const defaultProgress = (userId: string): UserProgress => ({
  userId,
  level: 'beginner',
  completedUnits: [],
  reviewQueue: [],
  stats: {
    totalSpeakCount: 0,
    streakDays: 0,
    lastStudyDate: '',
    fluencyHistory: [],
  },
  updatedAt: new Date().toISOString(),
})

// IndexedDB storage adapter for Zustand persist
// Falls back to localStorage if IndexedDB is unavailable (e.g. private browsing)
const idbStorage = {
  async getItem(name: string): Promise<StorageValue<ProgressStore> | null> {
    try {
      const { getProgress } = await import('@ds/db')
      const p = await getProgress()
      if (!p) return null
      return { state: { progress: p } as Partial<ProgressStore> } as StorageValue<ProgressStore>
    } catch {
      const raw = localStorage.getItem(name)
      return raw ? JSON.parse(raw) : null
    }
  },
  async setItem(name: string, value: StorageValue<ProgressStore>): Promise<void> {
    try {
      const { saveProgress } = await import('@ds/db')
      const p = (value.state as { progress: UserProgress }).progress
      if (p) await saveProgress(p)
    } catch {
      localStorage.setItem(name, JSON.stringify(value))
    }
  },
  async removeItem(name: string): Promise<void> {
    try {
      const { db } = await import('@ds/db')
      await db.progress.delete('local')
    } catch {
      localStorage.removeItem(name)
    }
  },
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: defaultProgress('local'),

      setLevel: (level) =>
        set(s => ({
          progress: { ...s.progress, level, updatedAt: new Date().toISOString() },
        })),

      completeUnit: (unitId) =>
        set(s => {
          if (s.progress.completedUnits.includes(unitId)) return s
          return {
            progress: {
              ...s.progress,
              completedUnits: [...s.progress.completedUnits, unitId],
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      recordSpeak: () =>
        set(s => {
          const today = new Date().toISOString().split('T')[0]
          const lastDate = s.progress.stats.lastStudyDate
          const streak = lastDate === today
            ? s.progress.stats.streakDays
            : lastDate === getPrevDay(today)
              ? s.progress.stats.streakDays + 1
              : 1
          return {
            progress: {
              ...s.progress,
              stats: {
                ...s.progress.stats,
                totalSpeakCount: s.progress.stats.totalSpeakCount + 1,
                streakDays: streak,
                lastStudyDate: today,
              },
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      getDueReviews: () => get().progress.reviewQueue.filter(isDueForReview),

      addToReviewQueue: (item) =>
        set(s => {
          const exists = s.progress.reviewQueue.some(
            r => r.unitId === item.unitId && r.chunkId === item.chunkId
          )
          if (exists) return s
          return {
            progress: {
              ...s.progress,
              reviewQueue: [...s.progress.reviewQueue, item],
              updatedAt: new Date().toISOString(),
            },
          }
        }),

      advanceReview: (unitId, chunkId) =>
        set(s => {
          const queue = s.progress.reviewQueue
            .map(item => item.unitId === unitId && item.chunkId === chunkId
              ? advanceMastery(item) : item)
            .filter(item => item.masteryLevel < 5)
          return {
            progress: { ...s.progress, reviewQueue: queue, updatedAt: new Date().toISOString() },
          }
        }),

      loadProgress: (p) => set({ progress: p }),
    }),
    {
      name: 'ds-progress',
      storage: idbStorage,
      skipHydration: true,
    }
  )
)

function getPrevDay(isoDate: string): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
