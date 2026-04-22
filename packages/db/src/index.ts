import Dexie, { type EntityTable } from 'dexie'
import type { UserProgress, ShadowingPack, ReviewItem, MasteryLevel } from '@ds/types'

interface DSDatabase extends Dexie {
  progress: EntityTable<UserProgress, 'userId'>
  shadowingPacks: EntityTable<ShadowingPack, 'id'>
}

export const db = new Dexie('ds-english') as DSDatabase

db.version(1).stores({
  progress: 'userId, updatedAt',
  shadowingPacks: 'id, createdAt',
})

// ─── Progress helpers ─────────────────────────────────────────────────────────

const LOCAL_USER_ID = 'local'

export async function getProgress(): Promise<UserProgress | null> {
  return (await db.progress.get(LOCAL_USER_ID)) ?? null
}

export async function saveProgress(p: UserProgress): Promise<void> {
  await db.progress.put({ ...p, updatedAt: new Date().toISOString() })
}

export async function initProgress(): Promise<UserProgress> {
  const existing = await getProgress()
  if (existing) return existing
  const fresh: UserProgress = {
    userId: LOCAL_USER_ID,
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
  }
  await db.progress.put(fresh)
  return fresh
}

export async function markUnitComplete(unitId: string): Promise<void> {
  const p = await getProgress()
  if (!p || p.completedUnits.includes(unitId)) return
  await saveProgress({ ...p, completedUnits: [...p.completedUnits, unitId] })
}

export async function addReviewItem(item: ReviewItem): Promise<void> {
  const p = await getProgress()
  if (!p) return
  const existing = p.reviewQueue.findIndex(
    r => r.unitId === item.unitId && r.chunkId === item.chunkId
  )
  const queue = [...p.reviewQueue]
  if (existing >= 0) queue[existing] = item
  else queue.push(item)
  await saveProgress({ ...p, reviewQueue: queue })
}

export async function updateReviewItem(
  unitId: string,
  chunkId: string,
  masteryLevel: MasteryLevel
): Promise<void> {
  const p = await getProgress()
  if (!p) return
  const queue = p.reviewQueue.map(r => {
    if (r.unitId !== unitId || r.chunkId !== chunkId) return r
    const days: Record<MasteryLevel, number> = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 }
    const next = new Date()
    next.setDate(next.getDate() + days[masteryLevel])
    return {
      ...r,
      masteryLevel,
      reviewCount: r.reviewCount + 1,
      nextReviewDate: next.toISOString().split('T')[0],
    }
  })
  await saveProgress({ ...p, reviewQueue: queue })
}

export async function recordSpeak(): Promise<void> {
  const p = await getProgress()
  if (!p) return
  const today = new Date().toISOString().split('T')[0]
  const lastDate = p.stats.lastStudyDate
  const streak = lastDate === today
    ? p.stats.streakDays
    : lastDate === getPrevDay(today)
    ? p.stats.streakDays + 1
    : 1
  await saveProgress({
    ...p,
    stats: {
      ...p.stats,
      totalSpeakCount: p.stats.totalSpeakCount + 1,
      streakDays: streak,
      lastStudyDate: today,
    },
  })
}

function getPrevDay(isoDate: string): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

// ─── ShadowingPack helpers ────────────────────────────────────────────────────

export async function savePack(pack: ShadowingPack): Promise<void> {
  await db.shadowingPacks.put(pack)
}

export async function getPack(id: string): Promise<ShadowingPack | null> {
  return (await db.shadowingPacks.get(id)) ?? null
}

export async function getAllPacks(): Promise<ShadowingPack[]> {
  return db.shadowingPacks.orderBy('createdAt').reverse().toArray()
}

export async function deletePack(id: string): Promise<void> {
  await db.shadowingPacks.delete(id)
}
