"use client"
export default function OverviewImpactoPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Visão Geral do Impacto</h1>
  <p className="text-sm">O Kwanza Stream não é apenas uma plataforma de streaming — é um motor de oportunidade para criadores angolanos. Desde o lançamento, apoiámos centenas de criadores pelo Creator Fund, formámos dezenas em workshops, e chegámos a 18 das 21 províncias.</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2">
    {[["2024", "Lançamento da plataforma em Luanda"], ["2025", "Expansão para 12 províncias, primeiro Creator Fund"], ["2026", "18 províncias, 5 escolas, programa de coding workshops"]].map(([a, d]) => <div key={a} className="flex gap-3"><span className="text-xs font-bold text-primary w-12">{a}</span><p className="text-xs text-muted-foreground">{d}</p></div>)}
  </div></div>) }
