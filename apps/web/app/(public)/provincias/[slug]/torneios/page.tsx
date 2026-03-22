"use client"
import { useParams } from "next/navigation"
import { getProvince } from "@/lib/angola-provinces"
export default function TorneiosPage() { const { slug } = useParams(); const p = getProvince(slug as string); return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Torneios em {p?.name || slug}</h1>
  <div className="space-y-2">{[{ title: "CS2 Regional " + (p?.name || ""), date: "12 Abr 2026", prize: "50.000 Kz", status: "Inscrições abertas" }, { title: "FIFA 26 " + (p?.name || ""), date: "3 Mai 2026", prize: "25.000 Kz", status: "Em breve" }].map((t,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-sm font-semibold">{t.title}</p><p className="text-[10px] text-muted-foreground">📅 {t.date} · 🏆 {t.prize} · {t.status}</p></div>)}</div></div>) }
