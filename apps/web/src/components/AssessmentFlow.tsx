'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgressStore } from '@/store/progress'
import type { Level } from '@ds/types'
import { Button, ProgressBar } from '@ds/ui'

interface Question {
  id: string
  prompt: string
  options: string[]
  answer: string
  level: Level
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Which is correct?',
    options: ['I am go to school', 'I go to school', 'I going school', 'I goes school'],
    answer: 'I go to school',
    level: 'beginner',
  },
  {
    id: 'q2',
    prompt: 'What does "Can I get the check?" mean?',
    options: ['我能检查一下吗', '我能拿到支票吗', '我要买单', '我能看菜单吗'],
    answer: '我要买单',
    level: 'beginner',
  },
  {
    id: 'q3',
    prompt: 'Fill in: "I\'ve been waiting ___ an hour."',
    options: ['since', 'for', 'during', 'while'],
    answer: 'for',
    level: 'beginner',
  },
  {
    id: 'q4',
    prompt: 'Which sounds most natural?',
    options: [
      'Could you speak more slowly?',
      'Can you speak slow more?',
      'Please speak with slow?',
      'You speak slowly can?',
    ],
    answer: 'Could you speak more slowly?',
    level: 'beginner',
  },
  {
    id: 'q5',
    prompt: '"I\'m not sure I follow you" means:',
    options: ['我不跟着你走', '我不确定我理解你', '我不关注你', '我不确定我喜欢你'],
    answer: '我不确定我理解你',
    level: 'intermediate',
  },
  {
    id: 'q6',
    prompt: 'Which is the most polite way to disagree?',
    options: [
      'You are wrong.',
      'That\'s not right.',
      'I see your point, but I think...',
      'No, I don\'t agree.',
    ],
    answer: 'I see your point, but I think...',
    level: 'intermediate',
  },
  {
    id: 'q7',
    prompt: '"Let\'s touch base next week" means:',
    options: ['我们下周碰个面/联系一下', '我们下周触碰基地', '我们下周打棒球', '我们下周开始'],
    answer: '我们下周碰个面/联系一下',
    level: 'intermediate',
  },
  {
    id: 'q8',
    prompt: 'Fill in: "She ___ the project by Friday."',
    options: ['will finish', 'will have finished', 'finishes', 'is finishing'],
    answer: 'will have finished',
    level: 'intermediate',
  },
  {
    id: 'q9',
    prompt: '"The proposal fell through" means:',
    options: ['提案通过了', '提案失败了', '提案掉下去了', '提案穿透了'],
    answer: '提案失败了',
    level: 'advanced',
  },
  {
    id: 'q10',
    prompt: 'Which best expresses a nuanced disagreement in a meeting?',
    options: [
      'I disagree.',
      'That\'s wrong.',
      'I take your point, though I\'d push back on the timeline.',
      'No, that won\'t work.',
    ],
    answer: 'I take your point, though I\'d push back on the timeline.',
    level: 'advanced',
  },
]

function scoreToLevel(correct: number): Level {
  if (correct <= 3) return 'beginner'
  if (correct <= 7) return 'intermediate'
  return 'advanced'
}

const LEVEL_LABELS: Record<Level, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

const LEVEL_DESC: Record<Level, string> = {
  beginner: '从日常高频场景开始，建立开口信心',
  intermediate: '强化职场和社交场景，突破流利度瓶颈',
  advanced: '攻克地道表达和复杂语境，接近母语水平',
}

export function AssessmentFlow() {
  const router = useRouter()
  const setLevel = useProgressStore(s => s.setLevel)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const q = QUESTIONS[current]
  const selected = answers[q?.id]

  function choose(option: string) {
    if (selected) return
    const next = { ...answers, [q.id]: option }
    setAnswers(next)
    setTimeout(() => {
      if (current < QUESTIONS.length - 1) {
        setCurrent(i => i + 1)
      } else {
        setDone(true)
      }
    }, 600)
  }

  function confirm() {
    const correct = QUESTIONS.filter(q => answers[q.id] === q.answer).length
    const level = scoreToLevel(correct)
    setLevel(level)
    router.push('/home')
  }

  if (done) {
    const correct = QUESTIONS.filter(q => answers[q.id] === q.answer).length
    const level = scoreToLevel(correct)
    return (
      <div className="flex flex-col items-center gap-6 text-center py-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-4xl">🎯</span>
        </div>
        <div>
          <p className="text-slate-400 text-sm mb-1">你的英语水平</p>
          <p className="text-4xl font-bold text-white">{LEVEL_LABELS[level]}</p>
          <p className="text-slate-400 text-sm mt-2">{correct} / {QUESTIONS.length} 题正确</p>
        </div>
        <div className="w-full bg-slate-800 rounded-2xl p-5 text-left">
          <p className="text-white font-medium mb-1">学习建议</p>
          <p className="text-slate-400 text-sm">{LEVEL_DESC[level]}</p>
        </div>
        <Button size="lg" onClick={confirm}>开始学习 →</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <ProgressBar steps={QUESTIONS.length} current={current} />

      <div>
        <p className="text-slate-500 text-xs mb-2">{current + 1} / {QUESTIONS.length}</p>
        <p className="text-xl font-semibold text-white leading-snug">{q.prompt}</p>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map(opt => {
          const isSelected = selected === opt
          const isCorrect = selected && opt === q.answer
          const isWrong = isSelected && opt !== q.answer
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-colors border ${
                isCorrect
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : isWrong
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : selected
                  ? 'bg-slate-800 border-slate-700 text-slate-400'
                  : 'bg-slate-800 border-slate-700 text-white hover:border-slate-500 hover:bg-slate-700'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
