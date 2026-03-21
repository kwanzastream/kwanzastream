"use client"

import { useState, useEffect } from "react"
import { Loader2, Lock } from "lucide-react"
import { CampCertificateCard } from "@/components/kwanza-camp/camp-certificate-card"
import { CampProgressBar } from "@/components/kwanza-camp/camp-progress-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

const LEVELS = [
  { level: 1, title: "Começa a Transmitir", total: 12 },
  { level: 2, title: "Cresce o teu Canal", total: 12 },
  { level: 3, title: "Torna-te Partner", total: 12 },
]

export default function CertificadosPage() {
  const [certs, setCerts] = useState<any[]>([])
  const [progress, setProgress] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get("/api/camp/my-certificates").catch(() => ({ data: [] })),
      api.get("/api/camp/curriculum").catch(() => ({ data: { progress: [] } })),
    ]).then(([c, p]) => { setCerts(c.data || []); setProgress(p.data?.progress || []) }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Os meus certificados</h1>
      {LEVELS.map(l => {
        const cert = certs.find((c: any) => c.level === l.level)
        const completed = progress.filter(p => p.startsWith(`nivel-${l.level}`)).length
        if (cert) return <CampCertificateCard key={l.level} certCode={cert.certCode} level={cert.level} issuedAt={cert.issuedAt} username={cert.user?.username || ""} />
        return (
          <div key={l.level} className="p-4 rounded-xl border border-white/10 flex items-center gap-3">
            <Lock className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Nível {l.level} — {l.title}</p>
              <CampProgressBar percentage={Math.round((completed / l.total) * 100)} size="sm" />
              <p className="text-[10px] text-muted-foreground mt-1">{completed}/{l.total}</p>
            </div>
          </div>
        )
      })}
      {certs.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Completa um nível para ganhar o teu primeiro certificado!</p>
          <Link href="/kwanza-camp"><Button variant="outline" size="sm" className="mt-2">Ir para o Camp</Button></Link>
        </div>
      )}
    </div>
  )
}
