"use client"

import { Trophy, Gift, Coins } from "lucide-react"

interface Prize {
  position: string
  amount?: string
  description?: string
  sponsor?: string
}

export function PrizeStructure({ prizes }: { prizes: Prize[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" />Estrutura de Prémios</h3>
      {prizes.map((p, i) => (
        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${i === 0 ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/10"}`}>
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-lg">{["🥇", "🥈", "🥉"][i] || "🏅"}</div>
          <div className="flex-1">
            <p className="text-sm font-bold">{p.position}</p>
            {p.description && <p className="text-[10px] text-muted-foreground">{p.description}</p>}
            {p.sponsor && <p className="text-[9px] text-primary">Patrocinado por {p.sponsor}</p>}
          </div>
          {p.amount && <span className="text-sm font-black text-yellow-400">{p.amount}</span>}
        </div>
      ))}
    </div>
  )
}
