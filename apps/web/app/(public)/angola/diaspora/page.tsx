"use client"
import { DiasporaRegionCard } from "@/components/angola/diaspora-region-card"
export default function DiasporaPage() {
  const regions = [
    { slug: "portugal", country: "Portugal", flag: "🇵🇹", creators: 45, desc: "Maior comunidade angolana na Europa" },
    { slug: "brasil", country: "Brasil", flag: "🇧🇷", creators: 23, desc: "Irmãos de língua no continente americano" },
    { slug: "africa-sul", country: "África do Sul", flag: "🇿🇦", creators: 18, desc: "Angolanos na ponta sul de África" },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <span className="text-4xl">🌍</span><h1 className="text-2xl font-bold">Angola Além-Fronteiras</h1>
    <p className="text-sm text-muted-foreground">Angolanos que transmitem de fora do país · Conteúdo em PT-AO · Para angolanos no mundo</p>
    <div className="grid grid-cols-3 gap-3">{regions.map(r => <DiasporaRegionCard key={r.slug} {...r} />)}</div>
    <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground text-center">86 criadores angolanos na diáspora · 3 continentes · Conteúdo 100% em PT-AO</div>
  </div>)
}
