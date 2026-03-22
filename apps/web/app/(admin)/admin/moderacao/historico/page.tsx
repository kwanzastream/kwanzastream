"use client"
export default function ModeracaoHistoricoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Histórico de Moderação</h1>
  <div className="space-y-1">{[{ action: "Ban", target: "@banned1", mod: "@kwanzastream", date: "15 Mar" }, { action: "Timeout", target: "@spammer", mod: "@ks-moderacao", date: "14 Mar" }].map((a,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-[10px] flex items-center justify-between"><span>{a.action} → @{a.target} por {a.mod}</span><span className="text-muted-foreground">{a.date}</span></div>)}</div></div>) }
