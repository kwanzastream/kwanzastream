"use client"
export default function DevEstatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas de Developers</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Developers registados", v: "12" }, { l: "Apps activas", v: "5" }, { l: "API calls/dia", v: "45k" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
