"use client"
import Link from "next/link"
export default function IdiomaPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
  <h1 className="text-2xl font-bold">🗣️ O Kwanza Stream em Todas as Línguas</h1>
  <div className="space-y-3">
    <div className="p-4 rounded-xl border border-white/10 space-y-1"><p className="text-sm font-semibold">🇦🇴 Português de Angola</p><p className="text-xs text-muted-foreground">Idioma principal — 96% do conteúdo · Padrão da plataforma</p></div>
    {[{ slug: "kikongo", flag: "🗣️", name: "Kikongo", region: "Norte de Angola (Zaire, Uíge, Cabinda)", pct: "2%" },
      { slug: "kimbundu", flag: "🗣️", name: "Kimbundu", region: "Luanda, Malanje, Bengo", pct: "1.5%" },
      { slug: "umbundu", flag: "🗣️", name: "Umbundu", region: "Planalto Central (Huambo, Bié, Benguela)", pct: "0.5%" },
    ].map(l => (
      <Link key={l.slug} href={`/idioma/${l.slug}`} className="block p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1">
        <p className="text-sm font-semibold">{l.flag} {l.name}</p>
        <p className="text-xs text-muted-foreground">{l.region} · {l.pct} do conteúdo</p>
      </Link>
    ))}
  </div>
</div>) }
