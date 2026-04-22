// Learning engine — spaced repetition scheduling
import type { ReviewItem, MasteryLevel } from '@ds/types'

const REVIEW_INTERVALS_DAYS: Record<MasteryLevel, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
}

export function nextReviewDate(masteryLevel: MasteryLevel): string {
  const days = REVIEW_INTERVALS_DAYS[masteryLevel]
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export function isDueForReview(item: ReviewItem): boolean {
  return item.nextReviewDate <= new Date().toISOString().split('T')[0]
}

export function advanceMastery(item: ReviewItem): ReviewItem {
  const next = Math.min(item.masteryLevel + 1, 5) as MasteryLevel
  return {
    ...item,
    masteryLevel: next,
    reviewCount: item.reviewCount + 1,
    nextReviewDate: nextReviewDate(next),
  }
}
