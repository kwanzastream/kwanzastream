"use client"
import Link from "next/link"
export default function EscolasPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
  <span className="text-4xl">📚</span><h1 className="text-2xl font-bold">Kwanza Stream nas Escolas</h1>
  <p className="text-sm text-muted-foreground">Programa gratuito para escolas secundárias angolanas</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2">
    <p className="text-xs">→ Workshops de criação de conteúdo</p><p className="text-xs">→ Formação de professores</p>
    <p className="text-xs">→ Canal escolar na plataforma</p><p className="text-xs">→ Transmissão de eventos escolares</p>
  </div>
  <div className="grid grid-cols-2 gap-3">{[{ v: "5", l: "Escolas parceiras" }, { v: "50", l: "Objectivo 2026" }].map((m,i) => <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold text-primary">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div>
  <div className="flex gap-2"><Link href="/educacao/escolas/programa" className="px-4 py-2 rounded-lg border border-white/10 text-xs hover:border-primary/20">Ver programa</Link><Link href="/educacao/escolas/inscrever" className="px-4 py-2 rounded-lg bg-primary text-white text-xs">Inscrever escola</Link></div>
</div>) }
