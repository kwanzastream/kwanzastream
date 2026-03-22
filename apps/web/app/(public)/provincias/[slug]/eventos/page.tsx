"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
export default function ProvinciaEventosPage() { const { slug } = useParams(); const p = getProvince(slug as string); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Eventos em {p?.name || slug}</h1>
  <div className="space-y-2">{[{ title: "Torneio Gaming " + (p?.name || ""), date: "5 Abr 2026", type: "Gaming" }, { title: "Festival de Música " + (p?.name || ""), date: "20 Abr 2026", type: "Música" }].map((e,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-sm font-semibold">{e.title}</p><p className="text-[10px] text-muted-foreground">📅 {e.date} · {e.type}</p></div>)}</div></div>) }
