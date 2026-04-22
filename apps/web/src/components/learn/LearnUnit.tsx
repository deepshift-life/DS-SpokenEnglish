'use client'

import { useState } from 'react'
import type { LearningUnit } from '@ds/types'
import { StepListen } from './StepListen'
import { StepChunks } from './StepChunks'
import { StepOutput } from './StepOutput'
import { UnitComplete } from './UnitComplete'

type Step = 'listen' | 'chunks' | 'output' | 'complete'

interface Props {
  unit: LearningUnit
}

export function LearnUnit({ unit }: Props) {
  const [step, setStep] = useState<Step>('listen')

  const steps: Step[] = ['listen', 'chunks', 'output']
  const stepIndex = steps.indexOf(step as any)

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Progress bar */}
      {step !== 'complete' && (
        <div className="flex gap-1.5 mb-8">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= stepIndex ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      )}

      {step === 'listen' && (
        <StepListen unit={unit} onNext={() => setStep('chunks')} />
      )}
      {step === 'chunks' && (
        <StepChunks unit={unit} onNext={() => setStep('output')} />
      )}
      {step === 'output' && (
        <StepOutput unit={unit} onNext={() => setStep('complete')} />
      )}
      {step === 'complete' && (
        <UnitComplete unit={unit} />
      )}
    </div>
  )
}
