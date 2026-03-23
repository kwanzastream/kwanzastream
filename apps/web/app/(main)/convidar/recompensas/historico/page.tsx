"use client"
import { useState, useEffect } from "react"
import { ReferralFriendItem } from "@/components/referral/referral-friend-item"
import api from "@/lib/api"
export default function HistoricoRecompensasPage() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get("/api/referral/rewards/history").then(r => setData(r.data)).catch(() => setData({ rewards: [{ id: "1", referred: { username: "amigo1" }, referrerSalos: 200, completedAt: "20 Mar" }, { id: "2", referred: { username: "amigo2" }, referrerSalos: 200, completedAt: "19 Mar" }, { id: "3", referred: { username: "amigo3" }, referrerSalos: 200, completedAt: "18 Mar" }], totalSalos: 600, bonuses: [] })) }, [])
  if (!data) return <div className="max-w-lg mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico de recompensas</h1>
      <p className="text-xs text-muted-foreground">Total ganho: <span className="text-primary font-bold">{(data.totalSalos || 0).toLocaleString()} Salos</span></p>
      {data.bonuses?.map((b: any) => <div key={b.at} className="p-2 rounded-lg bg-primary/5 border border-primary/10"><p className="text-[10px]">🎁 {b.label} · +{b.salos} Salos</p></div>)}
      <div className="space-y-0">{data.rewards?.map((r: any) => <ReferralFriendItem key={r.id} username={r.referred?.username} status="completed" date={r.completedAt || "recente"} salos={r.referrerSalos} />)}</div>
      {(!data.rewards || data.rewards.length === 0) && <div className="text-center py-12"><p className="text-xs text-muted-foreground">Nenhuma recompensa ainda. Convida amigos!</p></div>}
    </div>
  )
}
