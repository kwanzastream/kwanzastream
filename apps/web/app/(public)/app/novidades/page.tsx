"use client"
import { useState, useEffect } from "react"
import { VersionCard } from "@/components/app-download/version-card"
import api from "@/lib/api"
export default function NovidadesPage() {
  const [versions, setVersions] = useState<any[]>([])
  useEffect(() => { api.get("/api/app/changelog").then(r => setVersions(r.data || [])).catch(() => setVersions([{ version: "1.0.0", date: "1 Maio 2026", title: "Lançamento", features: ["Streaming ao vivo (720p)", "Chat em tempo real", "Salos e subscrições", "Modo Rádio", "Go-live pelo telemóvel", "PWA Android e iOS"] }])) }, [])
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
      <h1 className="text-lg font-bold">🎉 Novidades do Kwanza Stream</h1>
      {versions.map(v => <VersionCard key={v.version} {...v} />)}
    </div>
  )
}
