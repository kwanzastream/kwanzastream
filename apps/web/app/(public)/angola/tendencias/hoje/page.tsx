"use client"
export default function TendenciasHojePage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">📈 Trending Hoje</h1><p className="text-sm text-muted-foreground">Os streams e clips mais vistos nas últimas 24h em Angola</p>
  <div className="space-y-2">{[{ title: "Girabola ao vivo — Petro vs 1º Agosto", cat: "Futebol", v: 1234 }, { title: "Kuduro freestyle marathon", cat: "Música", v: 890 }, { title: "GTA RP Angola server", cat: "Gaming", v: 567 }].map((s, i) => (
    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="text-lg font-bold text-muted-foreground">{i+1}</span><div className="flex-1"><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.cat}</p></div><span className="text-sm font-bold">{s.v} 👁</span></div>
  ))}</div></div>) }
