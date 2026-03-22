"use client"
import { useState, useEffect } from "react"
const emojis = ["👏", "🔥", "😂", "🇦🇴", "❤️", "💎"]
export function WatchPartyReactions({ partyId }: { partyId: string }) {
  const [floating, setFloating] = useState<{ emoji: string; id: number; x: number }[]>([])
  const react = (emoji: string) => {
    const id = Date.now(); const x = 20 + Math.random() * 60
    setFloating(f => [...f, { emoji, id, x }])
    setTimeout(() => setFloating(f => f.filter(r => r.id !== id)), 2000)
  }
  return (
    <div className="relative">
      <div className="absolute bottom-12 left-0 right-0 pointer-events-none overflow-hidden h-40">
        {floating.map(r => <span key={r.id} className="absolute text-2xl animate-bounce" style={{ left: `${r.x}%`, bottom: 0, animation: "floatUp 2s ease-out forwards" }}>{r.emoji}</span>)}
      </div>
      <div className="flex items-center justify-center gap-1 py-1">
        {emojis.map(e => <button key={e} onClick={() => react(e)} className="text-lg hover:scale-125 transition-transform">{e}</button>)}
      </div>
      <style jsx>{`@keyframes floatUp { 0% { opacity: 1; transform: translateY(0) } 100% { opacity: 0; transform: translateY(-120px) scale(1.5) } }`}</style>
    </div>
  )
}
