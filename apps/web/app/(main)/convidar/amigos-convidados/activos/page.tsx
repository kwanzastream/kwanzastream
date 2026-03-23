"use client"
import { ReferralFriendItem } from "@/components/referral/referral-friend-item"
const active = [{ id: "1", username: "amigo1", date: "há 10 dias", streams: 12, salos: 500 }, { id: "2", username: "amigo2", date: "há 11 dias", streams: 5 }]
export default function ActivosPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Amigos activos ({active.length})</h1>
      <p className="text-[10px] text-muted-foreground">Amigos que criaram conta com o teu link.</p>
      <div className="space-y-2">{active.map(a => <div key={a.id} className="p-3 rounded-xl border border-white/10"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">👤</div><div><p className="text-xs font-semibold">@{a.username}</p><p className="text-[9px] text-muted-foreground">Registou-se {a.date}</p></div></div><p className="text-[9px] text-muted-foreground mt-1">Streams assistidos: {a.streams}{a.salos ? ` · Salos enviados: ${a.salos} Kz` : ""}</p></div>)}</div>
    </div>
  )
}
