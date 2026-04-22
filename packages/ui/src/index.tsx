import React from 'react'

// ─── Button ───────────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const VARIANT: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'bg-emerald-500 hover:bg-emerald-400 text-white',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
  danger:    'bg-red-500 hover:bg-red-400 text-white',
  ghost:     'bg-transparent hover:bg-slate-800 text-slate-300',
}

const SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-3 text-sm rounded-xl',
  lg: 'w-full py-4 text-lg rounded-2xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = '', onClick }: CardProps) {
  const base = 'bg-slate-800 rounded-2xl p-5'
  const interactive = onClick ? 'cursor-pointer hover:bg-slate-700 transition-colors' : ''
  return (
    <div className={`${base} ${interactive} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

// ─── ScoreRing ────────────────────────────────────────────────────────────────

export interface ScoreRingProps {
  value: number   // 0-100
  label: string
  size?: number   // diameter in px, default 56
}

export function ScoreRing({ value, label, size = 56 }: ScoreRingProps) {
  const r = size * 0.36
  const circ = 2 * Math.PI * r
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444'
  const cx = size / 2
  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ width: size, height: size }} className="relative">
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1e293b" strokeWidth={size * 0.07} />
          <circle cx={cx} cy={cx} r={r} fill="none" stroke={color}
            strokeWidth={size * 0.07}
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - value / 100)}
            strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {value}
        </span>
      </div>
      <span className="text-slate-500 text-[10px]">{label}</span>
    </div>
  )
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

export interface ProgressBarProps {
  steps: number
  current: number   // 0-indexed current step
  className?: string
}

export function ProgressBar({ steps, current, className = '' }: ProgressBarProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${
          i < current ? 'bg-emerald-500' : i === current ? 'bg-emerald-500/50' : 'bg-slate-700'
        }`} />
      ))}
    </div>
  )
}

// ─── VolumeBar ────────────────────────────────────────────────────────────────

export interface VolumeBarProps {
  volume: number   // 0-1
  bars?: number
}

export function VolumeBar({ volume, bars = 12 }: VolumeBarProps) {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {Array.from({ length: bars }, (_, i) => {
        const threshold = (i + 1) / bars
        return (
          <div key={i}
            className={`w-1.5 rounded-full transition-all duration-75 ${volume >= threshold ? 'bg-emerald-400' : 'bg-slate-700'}`}
            style={{ height: `${30 + i * 5}%` }} />
        )
      })}
    </div>
  )
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`} />
  )
}
