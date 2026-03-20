"use client"
export default function DropInsHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📜 Histórico de Drop-ins</h1>
      {[{ch:"@canal1",dur:"25 min",viewers:"+34",date:"18 Mar",accepted:true},{ch:"@canal4",dur:"",viewers:"",date:"15 Mar",accepted:false}].map(d => <div key={d.ch+d.date} className={`p-2.5 rounded-xl border ${d.accepted ? "border-white/10" : "border-red-500/20"}`}><div className="flex justify-between"><span className="text-xs font-bold">{d.ch}</span><span className="text-[8px] text-muted-foreground">{d.date}</span></div>{d.accepted ? <p className="text-[8px] text-muted-foreground">{d.dur} · {d.viewers} viewers ganhos</p> : <p className="text-[8px] text-red-400">Recusado</p>}</div>)}
    </div>
  )
}
