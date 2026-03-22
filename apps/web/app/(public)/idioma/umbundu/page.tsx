"use client"
export default function UmbunduPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">🗣️ Umbundu</h1>
  <p className="text-sm">O Umbundu é a língua bantu mais falada em Angola — 6+ milhões de falantes. Predomina no Planalto Central: Huambo, Bié e Benguela. O Umbundu é a língua das comunidades agrícolas e do comércio regional.</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">Frases úteis:</h2>
    {[["Ondjala", "Fome"], ["Okutumba", "Obrigado"], ["Olondjo", "Bom dia"], ["Ochipala", "Trabalho"]].map(([k,p]) => <p key={k} className="text-xs text-muted-foreground"><strong className="text-foreground">{k}</strong> — {p}</p>)}</div>
</div>) }
