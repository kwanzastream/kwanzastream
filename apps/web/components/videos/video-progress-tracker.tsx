"use client"

import { useState, useEffect, useRef } from "react"

interface VideoProgressTrackerProps {
  videoId: string
  duration: number // total duration in seconds
  onResume?: (position: number) => void
}

/**
 * Tracks and restores video playback position.
 * Saves position every 30 seconds for authenticated users.
 * On mount, checks for saved position and offers "Continue from X:XX?"
 */
export function VideoProgressTracker({ videoId, duration, onResume }: VideoProgressTrackerProps) {
  const [savedPosition, setSavedPosition] = useState<number | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Check for saved progress on mount
  useEffect(() => {
    const stored = localStorage.getItem(`vod-progress-${videoId}`)
    if (stored) {
      const pos = parseInt(stored, 10)
      if (pos > 30 && pos < duration - 60) setSavedPosition(pos) // only show if meaningful
    }
  }, [videoId, duration])

  // Save progress every 30 seconds (simulated — in production, POST to /api/videos/:id/progress)
  const startTracking = (currentPosition: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      // In production: api.post(`/api/videos/${videoId}/progress`, { position: currentPosition })
      localStorage.setItem(`vod-progress-${videoId}`, String(currentPosition))
    }, 30000)
  }

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current) } }, [])

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}` : `${m}:${sec.toString().padStart(2, "0")}`
  }

  if (!savedPosition || dismissed) return null

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30 text-sm">
      <span>Continuar de <strong>{formatTime(savedPosition)}</strong>?</span>
      <button className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold" onClick={() => { onResume?.(savedPosition); setDismissed(true); startTracking(savedPosition) }}>Sim</button>
      <button className="px-3 py-1 rounded-lg bg-white/10 text-xs" onClick={() => { setDismissed(true); startTracking(0) }}>Começar do início</button>
    </div>
  )
}

/** Hook to save progress — call from player component */
export function useSaveProgress(videoId: string) {
  const save = (position: number) => {
    localStorage.setItem(`vod-progress-${videoId}`, String(Math.floor(position)))
    // In production: debounced POST /api/videos/:id/progress { position }
  }
  return save
}
