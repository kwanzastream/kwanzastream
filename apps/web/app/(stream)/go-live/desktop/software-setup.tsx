"use client"

import { useEffect, useState } from "react"
import { RtmpConfigCard } from "@/components/go-live/rtmp-config-card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Loader2, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"

interface SoftwareSetupProps {
  name: string
  downloadUrl: string
  steps: string[]
}

function SoftwareSetupPage({ name, downloadUrl, steps }: SoftwareSetupProps) {
  const { user } = useAuth()
  const [streamKey, setStreamKey] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/streams/key").then(res => setStreamKey(res.data.streamKey || "mock-stream-key-12345"))
      .catch(() => setStreamKey("mock-stream-key-12345")).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">Configurar {name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Segue os passos abaixo para transmitir com {name}</p>
        </div>

        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full gap-2 mb-4">
            <ExternalLink className="w-4 h-4" /> Descarregar {name}
          </Button>
        </a>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">{i + 1}</div>
              <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
            </div>
          ))}
        </div>

        <RtmpConfigCard streamKey={streamKey} />

        <Link href="/dashboard/stream-manager">
          <Button className="w-full h-11">Já configurei — ir para o Stream Manager</Button>
        </Link>
      </div>
    </div>
  )
}

export default SoftwareSetupPage
