"use client"
export default function PortugalPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><span className="text-4xl">🇵🇹</span><h1 className="text-2xl font-bold">Angolanos em Portugal</h1><p className="text-sm">A maior comunidade angolana na Europa. 45 criadores transmitem de Lisboa, Porto, Faro e outras cidades. Conteúdo bilingue PT-PT e PT-AO.</p>
  <div className="grid grid-cols-3 gap-3">{[{ v: "45", l: "Criadores" }, { v: "12", l: "Ao vivo agora" }, { v: "3.400", l: "Viewers semanais" }].map((m,i) => <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div>
  <div className="space-y-2">{["@angola-lisboa", "@kuduro-porto", "@gamer-faro"].map(u => <div key={u} className="p-3 rounded-xl border border-white/10 text-sm">🇵🇹 {u}</div>)}</div>
</div>) }
