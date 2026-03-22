"use client"
export default function TendenciasSemanaPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">📈 Trending Esta Semana</h1><p className="text-sm text-muted-foreground">Top streams e categorias dos últimos 7 dias</p>
  <div className="space-y-2">{[{ title: "Torneio CS2 Angola #3", cat: "Gaming", v: 5600 }, { title: "Kizomba Sunset Session", cat: "Música", v: 3400 }, { title: "Workshop UI/UX Luanda", cat: "Tecnologia", v: 2100 }].map((s, i) => (
    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="text-lg font-bold text-muted-foreground">{i+1}</span><div className="flex-1"><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.cat}</p></div><span className="text-sm font-bold">{s.v} 👁</span></div>
  ))}</div></div>) }
