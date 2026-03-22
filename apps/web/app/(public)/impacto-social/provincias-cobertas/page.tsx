"use client"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"
export default function ProvinciasCobertasPage() { const active = ANGOLA_PROVINCES.filter(p => !["cuando", "icolo-e-bengo", "cubango"].includes(p.slug)); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Províncias Cobertas</h1>
  <p className="text-sm text-muted-foreground">18 de 21 províncias com criadores activos</p>
  <div className="grid grid-cols-3 gap-2">{ANGOLA_PROVINCES.map(p => <div key={p.slug} className={`p-2 rounded-lg border text-xs text-center ${active.find(a => a.slug === p.slug) ? "border-green-500/20 bg-green-500/5 text-green-400" : "border-white/5 text-muted-foreground"}`}>{p.name}</div>)}</div>
  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground text-center">Objectivo 2026: 21/21 províncias com pelo menos 1 criador activo</div>
</div>) }
