"use client"

import { useEffect, useRef, useState } from "react"

interface AudioLevelMeterProps {
  stream?: MediaStream | null
  className?: string
  barCount?: number
}

export function AudioLevelMeter({ stream, className = "", barCount = 20 }: AudioLevelMeterProps) {
  const [level, setLevel] = useState(0)
  const animRef = useRef<number>(0)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    if (!stream) return

    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.8

    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)

    ctxRef.current = audioCtx
    analyserRef.current = analyser

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const tick = () => {
      analyser.getByteFrequencyData(dataArray)
      // Average of frequency bins
      const avg = dataArray.reduce((s, v) => s + v, 0) / dataArray.length
      // Normalize to 0-100
      setLevel(Math.min(100, Math.round((avg / 128) * 100)))
      animRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animRef.current)
      source.disconnect()
      audioCtx.close()
    }
  }, [stream])

  const activeBars = Math.round((level / 100) * barCount)

  return (
    <div className={`flex items-end gap-0.5 h-8 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const isActive = i < activeBars
        const pct = i / barCount
        const color = pct < 0.6 ? "bg-green-400" : pct < 0.85 ? "bg-amber-400" : "bg-red-400"
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all duration-75 ${isActive ? color : "bg-white/10"}`}
            style={{ height: `${30 + (i / barCount) * 70}%` }}
          />
        )
      })}
    </div>
  )
}

// Hook for recording test
export function useAudioTest() {
  const [recording, setRecording] = useState(false)
  const [playbackUrl, setPlaybackUrl] = useState("")
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const startTest = (stream: MediaStream) => {
    chunks.current = []
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" })
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.current.push(e.data) }
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" })
      setPlaybackUrl(URL.createObjectURL(blob))
    }
    recorder.start()
    mediaRecorder.current = recorder
    setRecording(true)
    // Auto-stop after 5s
    setTimeout(() => { recorder.stop(); setRecording(false) }, 5000)
  }

  return { recording, playbackUrl, startTest }
}
