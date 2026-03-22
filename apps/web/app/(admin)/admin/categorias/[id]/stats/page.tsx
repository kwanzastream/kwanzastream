"use client"
export default function CategoriaStatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Estatísticas da Categoria</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Streams activos", v: "45" }, { l: "Viewers médios", v: "1.200" }, { l: "Crescimento", v: "+12%" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
