"use client"
export default function ParceriasONGPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Parcerias com ONGs</h1>
  <p className="text-sm text-muted-foreground">Organizações parceiras que ajudam a levar o Kwanza Stream a mais criadores</p>
  <div className="space-y-3">
    {[{ name: "Tech Angola", focus: "Formação digital para jovens", since: "2025" }, { name: "Rede de Empreendedores AO", focus: "Apoio a criadores de conteúdo", since: "2025" }, { name: "UNESCO Angola", focus: "Preservação cultural digital", since: "2026" }].map(o => (
      <div key={o.name} className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-sm font-semibold">🤝 {o.name}</p><p className="text-[10px] text-muted-foreground">{o.focus} · Parceira desde {o.since}</p></div>
    ))}
  </div></div>) }
