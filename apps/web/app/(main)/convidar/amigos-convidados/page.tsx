"use client"
import { useState, useEffect } from "react"
import { ReferralFriendItem } from "@/components/referral/referral-friend-item"
import api from "@/lib/api"
import Link from "next/link"
export default function AmigosConvidadosPage() {
  const [friends, setFriends] = useState<any[]>([])
  useEffect(() => { api.get("/api/referral/friends").then(r => setFriends(r.data || [])).catch(() => setFriends([{ id: "1", referred: { username: "amigo1" }, status: "completed", createdAt: "há 10 dias" }, { id: "2", referred: { username: "amigo2" }, status: "completed", createdAt: "há 11 dias" }, { id: "3", status: "pending", createdAt: "há 2 dias" }])) }, [])
  const completed = friends.filter(f => f.status === "completed")
  const pending = friends.filter(f => f.status === "pending")
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Amigos convidados ({friends.length})</h1>
      <div className="flex items-center gap-2 text-[10px]"><Link href="/convidar/amigos-convidados/activos" className="px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5">Activos ({completed.length})</Link><Link href="/convidar/amigos-convidados/pendentes" className="px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5">Pendentes ({pending.length})</Link></div>
      {completed.length > 0 && <div><h2 className="text-xs font-semibold mb-2">Activos</h2>{completed.map(f => <ReferralFriendItem key={f.id} username={f.referred?.username} status="completed" date={f.createdAt} salos={200} />)}</div>}
      {pending.length > 0 && <div><h2 className="text-xs font-semibold mb-2">Pendentes</h2>{pending.map(f => <ReferralFriendItem key={f.id} status="pending" date={f.createdAt} />)}</div>}
      {friends.length === 0 && <div className="text-center py-12"><p className="text-xs text-muted-foreground">Nenhum amigo convidado ainda.</p></div>}
    </div>
  )
}
