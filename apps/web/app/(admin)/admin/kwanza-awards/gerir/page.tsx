"use client"
export default function AwardsGerirPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Gerir Awards</h1>
  <div className="space-y-3">{[{ l: "Abrir nomeações", v: false }, { l: "Abrir votação", v: false }, { l: "Revelar resultados", v: false }].map(s => <div key={s.l} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs">{s.l}</span><span className="text-[10px] text-muted-foreground">{s.v ? "✅" : "❌"}</span></div>)}</div></div>) }
