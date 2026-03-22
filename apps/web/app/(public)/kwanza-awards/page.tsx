"use client"
import Link from "next/link"
import { Trophy } from "lucide-react"
export default function KwanzaAwardsPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-center">
  <Trophy className="w-12 h-12 text-primary mx-auto" />
  <h1 className="text-3xl font-bold">🏆 Kwanza Awards</h1>
  <p className="text-sm text-muted-foreground">A cerimónia anual de premiação dos melhores criadores angolanos</p>
  <blockquote className="text-lg italic text-muted-foreground">&ldquo;Celebrando a criatividade angolana&rdquo;</blockquote>
  <div className="flex gap-3 justify-center">
    <Link href="/kwanza-awards/2026" className="px-4 py-2 rounded-lg bg-primary text-white text-sm">Edição 2026 →</Link>
    <Link href="/kwanza-awards/historico" className="px-4 py-2 rounded-lg border border-white/10 text-sm">Histórico →</Link>
  </div>
</div>) }
