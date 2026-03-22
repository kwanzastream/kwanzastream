"use client"
export default function ComediaPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><span className="text-4xl">😂</span><h1 className="text-2xl font-bold">Comédia no Kwanza Stream</h1><p className="text-sm">Humor angolano sem filtro. Stand-up, sketches, e reacções — os comediantes angolanos encontraram na plataforma o palco perfeito. Conteúdo em PT-AO com gíria de rua.</p>
  <div className="grid grid-cols-3 gap-3">{[{ v: "9", l: "Streams" }, { v: "28", l: "Comediantes" }, { v: "890", l: "Clips virais" }].map((m,i) => <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div>
</div>) }
