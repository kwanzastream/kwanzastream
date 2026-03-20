"use client"
import Link from "next/link"
export default function ReportsResolvidosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">✅ Reports Resolvidos</h1>
      <div className="flex gap-1"><Link href="/dashboard/moderacao/reports/pendentes"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Pendentes</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Resolvidos</button></div>
      {[{reported:"@spammer",reason:"Spam",action:"🚫 Banido",by:"@mod1",date:"18 Mar"},{reported:"@troll",reason:"Assédio",action:"⏱️ Timeout 30min",by:"@mod2",date:"15 Mar"},{reported:"@viewer8",reason:"Falso report",action:"❌ Ignorado",by:"Streamer",date:"12 Mar"}].map(r => <div key={r.reported} className="p-2.5 rounded-xl border border-white/10"><div className="flex justify-between"><span className="text-xs font-bold">{r.reported}</span><span className="text-[8px]">{r.action}</span></div><p className="text-[8px] text-muted-foreground">{r.reason} · {r.by} · {r.date}</p></div>)}
    </div>
  )
}
