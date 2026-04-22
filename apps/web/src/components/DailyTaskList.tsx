import Link from 'next/link'
import type { LearningUnit } from '@ds/types'

interface Props {
  units: LearningUnit[]
}

export function DailyTaskList({ units }: Props) {
  return (
    <ul className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
      {units.map(unit => (
        <li key={unit.id}>
          <Link
            href={`/learn/${unit.id}`}
            className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-4 transition-colors group"
          >
            <div>
              <p className="text-xs text-slate-500 mb-0.5">{unit.scene}</p>
              <p className="font-medium text-white">{unit.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{unit.chunks.length} 个短语块 · 约10分钟</p>
            </div>
            <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  )
}
