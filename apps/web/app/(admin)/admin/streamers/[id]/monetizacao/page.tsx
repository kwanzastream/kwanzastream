"use client"
export default function StreamerMonetizacaoPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Monetização</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Salos recebidos", v: "12.300" }, { l: "Subscritores", v: "45" }, { l: "Total Kz", v: "34.500 Kz" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div></div>) }
