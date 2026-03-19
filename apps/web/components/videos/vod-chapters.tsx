"use client"

export interface Chapter {
  time: number // seconds from start
  label: string
}

interface VodChaptersProps {
  chapters: Chapter[]
  duration: number
  currentTime?: number
  onSeek?: (time: number) => void
}

function formatTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}` : `${m}:${sec.toString().padStart(2, "0")}`
}

export function VodChapters({ chapters, duration, currentTime = 0, onSeek }: VodChaptersProps) {
  if (chapters.length === 0) return null

  // Find active chapter
  const activeIdx = chapters.reduce((acc, ch, i) => (currentTime >= ch.time ? i : acc), 0)

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold">Capítulos</h3>

      {/* Timeline bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        {chapters.map((ch, i) => {
          const start = (ch.time / duration) * 100
          const end = i < chapters.length - 1 ? (chapters[i + 1].time / duration) * 100 : 100
          return (
            <button key={i} onClick={() => onSeek?.(ch.time)}
              className={`absolute top-0 h-full transition-colors ${i === activeIdx ? "bg-primary/60" : "hover:bg-white/20"}`}
              style={{ left: `${start}%`, width: `${end - start}%` }}
              title={`${formatTime(ch.time)} — ${ch.label}`} />
          )
        })}
        {/* Chapter separators */}
        {chapters.slice(1).map((ch, i) => (
          <div key={i} className="absolute top-0 w-0.5 h-full bg-background" style={{ left: `${(ch.time / duration) * 100}%` }} />
        ))}
      </div>

      {/* Chapter pills */}
      <div className="flex flex-wrap gap-2">
        {chapters.map((ch, i) => (
          <button key={i} onClick={() => onSeek?.(ch.time)}
            className={`px-2 py-1 rounded-lg border text-xs transition-all ${i === activeIdx ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/[0.04] hover:border-primary/30"}`}>
            <span className="font-mono text-primary">{formatTime(ch.time)}</span> {ch.label}
          </button>
        ))}
      </div>
    </div>
  )
}
