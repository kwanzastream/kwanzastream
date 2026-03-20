"use client"
import Link from "next/link"
export default function ClaimsResolvidosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">✅ Claims Resolvidos</h1>
      <div className="flex gap-1"><Link href="/dashboard/moderacao/claims/pendentes"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Pendentes</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Resolvidos</button></div>
      {[{clip:"Highlight torneio",action:"✅ Aprovado — clip removido",by:"Streamer",date:"8 Mar"},{clip:"Reacção a vídeo",action:"❌ Rejeitado — fair use",by:"Streamer",date:"5 Mar"}].map(c => <div key={c.clip} className="p-2.5 rounded-xl border border-white/10"><p className="text-xs font-bold">{c.clip}</p><p className="text-[8px] text-muted-foreground">{c.action} · {c.by} · {c.date}</p></div>)}
    </div>
  )
}
