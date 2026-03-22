"use client"
export default function KimbunduPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">🗣️ Kimbundu</h1>
  <p className="text-sm">O Kimbundu é a língua dos Ambundu, falada em Luanda, Malanje e Bengo. É a língua que mais influenciou o Português de Angola — muitas expressões do dia-a-dia têm origem Kimbundu.</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">Frases úteis:</h2>
    {[["Kiambote", "Olá"], ["Ngana", "Senhor/a"], ["Ngulungu", "Obrigado"], ["Sanzala", "Aldeia"]].map(([k,p]) => <p key={k} className="text-xs text-muted-foreground"><strong className="text-foreground">{k}</strong> — {p}</p>)}</div>
</div>) }
