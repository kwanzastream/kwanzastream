"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Eye, EyeOff, Radio } from "lucide-react"
import { toast } from "sonner"

interface RtmpConfigCardProps {
  streamKey: string
  rtmpUrl?: string
  className?: string
}

export function RtmpConfigCard({
  streamKey, rtmpUrl = "rtmp://live.kwanzastream.ao/live", className = "",
}: RtmpConfigCardProps) {
  const [showKey, setShowKey] = useState(false)
  const [copiedField, setCopiedField] = useState("")

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      toast.success("Copiado!")
      setTimeout(() => setCopiedField(""), 2000)
    } catch {
      toast.error("Erro ao copiar")
    }
  }

  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Radio className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold">Configuração RTMP</h3>
      </div>

      {/* Server URL */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">URL do Servidor</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-black/40 rounded-lg px-3 py-2 text-xs font-mono truncate border border-white/10">
            {rtmpUrl}
          </code>
          <Button size="icon" variant="ghost" className="w-8 h-8 shrink-0" onClick={() => handleCopy(rtmpUrl, "url")}>
            {copiedField === "url" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Stream Key */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Stream Key</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-black/40 rounded-lg px-3 py-2 text-xs font-mono truncate border border-white/10">
            {showKey ? streamKey : "•".repeat(Math.min(streamKey.length, 32))}
          </code>
          <Button size="icon" variant="ghost" className="w-8 h-8 shrink-0" onClick={() => setShowKey(s => !s)}>
            {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </Button>
          <Button size="icon" variant="ghost" className="w-8 h-8 shrink-0" onClick={() => handleCopy(streamKey, "key")}>
            {copiedField === "key" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
        <p className="text-[10px] text-amber-400">
          ⚠️ Nunca partilhes a tua stream key. Qualquer pessoa com esta chave pode transmitir no teu canal.
        </p>
      </div>

      {/* Recommended settings */}
      <div className="space-y-1">
        <p className="text-[10px] text-muted-foreground font-bold uppercase">Configurações recomendadas</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/30 rounded-lg p-2"><p className="text-xs font-bold">2500</p><p className="text-[9px] text-muted-foreground">kbps</p></div>
          <div className="bg-black/30 rounded-lg p-2"><p className="text-xs font-bold">720p</p><p className="text-[9px] text-muted-foreground">resolução</p></div>
          <div className="bg-black/30 rounded-lg p-2"><p className="text-xs font-bold">30</p><p className="text-[9px] text-muted-foreground">fps</p></div>
        </div>
      </div>
    </div>
  )
}
