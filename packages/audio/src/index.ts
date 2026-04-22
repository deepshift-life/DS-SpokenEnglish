// Audio recording and playback utilities (browser only)

export interface RecordingResult {
  blob: Blob
  durationMs: number
}

export interface RecordingHandle {
  stop: () => Promise<RecordingResult>
  getVolume: () => number  // 0-1, current RMS volume for visualisation
}

export async function startRecording(): Promise<RecordingHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  // Set up analyser for real-time volume
  const ctx = new AudioContext()
  const source = ctx.createMediaStreamSource(stream)
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 256
  source.connect(analyser)
  const buf = new Uint8Array(analyser.frequencyBinCount)

  const recorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm',
  })
  const chunks: Blob[] = []
  const startTime = Date.now()
  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }
  recorder.start(100)

  return {
    getVolume() {
      analyser.getByteTimeDomainData(buf)
      let sum = 0
      for (const v of buf) sum += Math.abs(v - 128)
      return Math.min(1, (sum / buf.length) / 64)
    },
    stop() {
      return new Promise(resolve => {
        recorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop())
          ctx.close()
          resolve({
            blob: new Blob(chunks, { type: recorder.mimeType }),
            durationMs: Date.now() - startTime,
          })
        }
        recorder.stop()
      })
    },
  }
}

// ─── Playback ─────────────────────────────────────────────────────────────────

export interface PlaybackHandle {
  pause: () => void
  resume: () => void
  stop: () => void
  readonly currentTime: number
  readonly duration: number
  readonly ended: boolean
}

export function playAudio(url: string, onEnd?: () => void): PlaybackHandle {
  const el = new Audio(url)
  el.onended = () => onEnd?.()
  el.play().catch(() => onEnd?.())
  return {
    pause: () => el.pause(),
    resume: () => el.play().catch(() => {}),
    stop: () => { el.pause(); el.currentTime = 0 },
    get currentTime() { return el.currentTime },
    get duration() { return el.duration || 0 },
    get ended() { return el.ended },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert a Blob to base64 string */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/** Format seconds as mm:ss */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ─── TTS ──────────────────────────────────────────────────────────────────────

/**
 * Speak text with best available voice:
 * 1. /api/tts (ElevenLabs) if available
 * 2. Web Speech API (browser native) as fallback
 */
export async function speakText(text: string, onEnd?: () => void): Promise<PlaybackHandle | null> {
  // Try ElevenLabs via server route
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const handle = playAudio(url, () => {
        URL.revokeObjectURL(url)
        onEnd?.()
      })
      return handle
    }
  } catch { /* fall through */ }

  // Fallback: Web Speech API
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return new Promise(resolve => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 0.9
      utter.pitch = 1.0

      const applyVoice = () => {
        const voices = speechSynthesis.getVoices()
        // Prefer neural/enhanced voices, then any en-US
        const preferred = voices.find(v =>
          v.lang.startsWith('en') && (
            v.name.includes('Neural') ||
            v.name.includes('Enhanced') ||
            v.name.includes('Premium') ||
            v.name.includes('Samantha') ||
            v.name.includes('Google US English')
          )
        ) ?? voices.find(v => v.lang === 'en-US') ?? voices.find(v => v.lang.startsWith('en'))
        if (preferred) utter.voice = preferred
      }

      applyVoice()
      utter.onend = () => onEnd?.()

      speechSynthesis.speak(utter)

      // Dummy handle — Web Speech API doesn't expose a real handle
      resolve({
        pause: () => speechSynthesis.pause(),
        resume: () => speechSynthesis.resume(),
        stop: () => speechSynthesis.cancel(),
        get currentTime() { return 0 },
        get duration() { return 0 },
        get ended() { return !speechSynthesis.speaking },
      })
    })
  }

  onEnd?.()
  return null
}
