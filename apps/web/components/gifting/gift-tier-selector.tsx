"use client"

import { Check } from "lucide-react"

export interface TierData {
  id: string
  name: string
  price: number
  benefits: string[]
  color: string
}

export const TIERS: TierData[] = [
  { id: "tier1", name: "Tier 1", price: 500, benefits: ["Emojis exclusivos", "Badge no chat", "Sem anúncios"], color: "border-blue-500/30 bg-blue-500/5" },
  { id: "tier2", name: "Tier 2", price: 1500, benefits: ["Tudo do Tier 1", "Emojis animados", "Prioridade no chat", "VODs exclusivos"], color: "border-purple-500/30 bg-purple-500/5" },
  { id: "tier3", name: "Tier 3", price: 3000, benefits: ["Tudo do Tier 2", "Badge especial", "Acesso ao Discord", "Nome em destaque", "1-on-1 com streamer"], color: "border-yellow-500/30 bg-yellow-500/5" },
]

export function GiftTierSelector({ selected, onChange }: { selected: string; onChange: (tier: string) => void }) {
  return (
    <div className="space-y-2">
      {TIERS.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} className={`w-full p-4 rounded-xl border text-left transition-all ${selected === t.id ? t.color : "border-white/10"}`}>
          <div className="flex items-center justify-between mb-2"><span className="text-sm font-bold">{t.name}</span><span className="text-sm font-bold text-primary">{t.price.toLocaleString()} Kz/mês</span></div>
          <ul className="space-y-0.5">{t.benefits.map(b => <li key={b} className="text-[10px] text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-green-400" />{b}</li>)}</ul>
        </button>
      ))}
    </div>
  )
}
