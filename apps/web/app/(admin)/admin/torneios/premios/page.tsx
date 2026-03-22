"use client"
export default function TorneioPremiosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Prémios de Torneios</h1>
  <div className="space-y-2">{[{ pos: "1º", prize: "50.000 Kz" }, { pos: "2º", prize: "25.000 Kz" }, { pos: "3º", prize: "10.000 Kz" }].map(p => <div key={p.pos} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs font-bold">{p.pos}</span><span className="text-xs">{p.prize}</span></div>)}</div></div>) }
