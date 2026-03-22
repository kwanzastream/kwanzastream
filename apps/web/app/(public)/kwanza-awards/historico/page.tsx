"use client"
import Link from "next/link"
export default function HistoricoPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">Histórico de Edições</h1>
  <div className="space-y-3">
    <Link href="/kwanza-awards/2026" className="block p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1"><p className="text-sm font-semibold">🏆 Kwanza Awards 2026</p><p className="text-[10px] text-muted-foreground">15 Dezembro 2026 · Em preparação</p></Link>
    <div className="p-4 rounded-xl border border-white/10 text-center text-muted-foreground text-xs">Primeira edição! Histórico será adicionado em 2027.</div>
  </div>
</div>) }
