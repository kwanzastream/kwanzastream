"use client"
export default function SobreEquipaPage() { return (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-xl font-bold">A Equipa</h1>
    <div className="p-6 rounded-xl border border-white/10 text-center space-y-2">
      <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center text-2xl">👤</div>
      <p className="text-sm font-bold">Fundador</p>
      <p className="text-xs text-muted-foreground">@kwanzastream</p>
      <p className="text-xs text-muted-foreground">A construir Angola's first live streaming platform.</p>
    </div>
    <div className="p-4 rounded-xl border border-white/10 bg-primary/5"><p className="text-xs text-center">Estamos a crescer! Vê as nossas <a href="/carreiras" className="text-primary hover:underline">vagas abertas</a>.</p></div>
  </div>
) }
