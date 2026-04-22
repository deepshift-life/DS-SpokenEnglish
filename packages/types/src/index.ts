// ─── Levels ───────────────────────────────────────────────────────────────────

export type Level = 'beginner' | 'intermediate' | 'advanced'

// ─── Content ──────────────────────────────────────────────────────────────────

export interface Chunk {
  id: string
  text: string        // e.g. "Can I get the check?"
  audioUrl: string    // relative path in offline content pack
  scene: string
}

export interface AudioSegment {
  index: number
  startTime: number   // seconds
  endTime: number
  text: string        // ASR transcript
  audioUrl: string    // baidu netdisk URL or local path
}

export interface LearningUnit {
  id: string
  level: Level
  scene: string
  title: string
  audioUrl: string    // full dialogue audio, offline
  chunks: Chunk[]     // 3-5 chunks per unit
  dialogueText: string
}

export interface ShadowingPack {
  id: string
  title: string
  sourceUrl: string   // baidu netdisk original file URL
  segments: AudioSegment[]
  createdAt: string   // ISO date
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export type MasteryLevel = 1 | 2 | 3 | 4 | 5

export interface ReviewItem {
  unitId: string
  chunkId: string
  nextReviewDate: string  // ISO date
  reviewCount: number
  masteryLevel: MasteryLevel
}

export interface UserStats {
  totalSpeakCount: number
  streakDays: number
  lastStudyDate: string   // ISO date
  fluencyHistory: FluencyRecord[]
}

export interface FluencyRecord {
  date: string            // ISO date
  score: number           // 0-100
  unitId: string
}

export interface UserProgress {
  userId: string
  level: Level
  completedUnits: string[]
  reviewQueue: ReviewItem[]
  stats: UserStats
  updatedAt: string       // ISO date, used for Last-Write-Wins sync
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface BaiduToken {
  accessToken: string
  refreshToken: string
  expiresAt: number       // unix timestamp ms
}

export interface User {
  id: string
  name: string
  avatarUrl?: string
}

// ─── Assessment ───────────────────────────────────────────────────────────────

export interface AssessmentQuestion {
  id: string
  type: 'listen-choose' | 'speak-word' | 'sentence-order'
  audioUrl?: string
  options?: string[]
  answer: string
}

export interface AssessmentResult {
  score: number
  level: Level
}

// ─── Speech scoring ───────────────────────────────────────────────────────────

export interface SpeechScore {
  fluency: number       // 0-100, primary metric
  accuracy: number      // 0-100
  completeness: number  // 0-100
  overall: number       // 0-100
}
