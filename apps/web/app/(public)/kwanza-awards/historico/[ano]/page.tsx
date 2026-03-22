"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
export default function AwardsAnoPage() { const { ano } = useParams(); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">Kwanza Awards {ano}</h1>
  {String(ano) === "2026" ? <div><p className="text-sm text-muted-foreground">A edição 2026 é a primeira — <Link href="/kwanza-awards/2026" className="text-primary">ver detalhes</Link></p></div>
  : <div className="p-4 rounded-xl border border-white/10 text-center text-muted-foreground text-xs">Edição {String(ano)} não encontrada.</div>}
</div>) }
