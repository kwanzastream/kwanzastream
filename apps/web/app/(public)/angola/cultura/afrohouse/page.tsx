"use client"
export default function AfrohousePage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><span className="text-4xl">🎧</span><h1 className="text-2xl font-bold">Afrohouse no Kwanza Stream</h1><p className="text-sm">O Afrohouse angolano é uma fusão de house music com ritmos tradicionais africanos. DJs como DJ Maphorisa, DJ Satelite e Dj Marfox são referência mundial.</p>
  <div className="grid grid-cols-3 gap-3">{[{ v: "15", l: "Streams" }, { v: "34", l: "DJs" }, { v: "156", l: "Clips" }].map((m,i) => <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div>
</div>) }
