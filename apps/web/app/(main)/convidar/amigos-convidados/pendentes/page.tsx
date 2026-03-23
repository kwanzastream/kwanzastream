"use client"
import { ReferralFriendItem } from "@/components/referral/referral-friend-item"
const pending = [{ id: "1", date: "21 Mar", clicks: 1 }, { id: "2", date: "18 Mar", clicks: 2 }]
export default function PendentesPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Convites pendentes ({pending.length})</h1>
      <p className="text-[10px] text-muted-foreground">Pessoas que clicaram no teu link mas ainda não criaram conta.</p>
      <div className="space-y-2">{pending.map(p => <div key={p.id} className="p-3 rounded-xl border border-white/10"><p className="text-xs">Partilhado a {p.date} · {p.clicks} clique{p.clicks > 1 ? "s" : ""} · Sem registo</p><div className="flex gap-2 mt-2"><button className="text-[9px] text-primary hover:underline">Re-partilhar</button><button className="text-[9px] text-muted-foreground hover:text-red-400">Descartar</button></div></div>)}</div>
      <p className="text-[9px] text-muted-foreground text-center">💡 Dica: Partilha novamente no WhatsApp para lembrar os teus amigos!</p>
    </div>
  )
}
