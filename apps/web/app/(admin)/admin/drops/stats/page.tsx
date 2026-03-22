"use client"
export default function DropsEstatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas de Drops</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Drops activos", v: "2" }, { l: "Claims total", v: "1.234" }, { l: "Retenção média", v: "+34%" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
