"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import api from "@/lib/api"
export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([])
  useEffect(() => { api.get("/api/education/workshops").then(r => setWorkshops(r.data || [])).catch(() => {}) }, [])
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Workshops Disponíveis</h1>
    <div className="space-y-3">{workshops.map((w: any) => (
      <Link key={w.id} href={`/educacao/coding/workshops/${w.id}`} className="block p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1">
        <p className="text-sm font-semibold">{w.title}</p><p className="text-[10px] text-muted-foreground">{w.description}</p>
        <p className="text-[10px] text-primary">📅 {new Date(w.date).toLocaleDateString("pt-AO")} · {w.maxAttendees} vagas</p>
      </Link>
    ))}</div>
  </div>)
}
