"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import api from "@/lib/api"
import Link from "next/link"
export default function VersaoPage() {
  const { versao } = useParams()
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get(`/api/app/changelog/${versao}`).then(r => setData(r.data)).catch(() => setData({ version: versao, date: "1 Maio 2026", title: "Lançamento", features: ["Streaming ao vivo (720p)", "Chat em tempo real", "Salos e subscrições", "Modo Rádio", "Go-live pelo telemóvel", "PWA Android e iOS"] })) }, [versao])
  if (!data) return <div className="max-w-lg mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
      <Link href="/app/novidades" className="text-[10px] text-muted-foreground hover:text-foreground">← Todas as versões</Link>
      <h1 className="text-lg font-bold">Kwanza Stream v{data.version}</h1>
      <p className="text-xs text-primary">{data.title} · {data.date}</p>
      <div className="space-y-1">{data.features?.map((f: string, i: number) => <div key={i} className="flex items-center gap-2 text-xs"><span className="text-green-400">✅</span>{f}</div>)}</div>
    </div>
  )
}
