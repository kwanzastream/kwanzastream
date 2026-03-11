"use client"

import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Copy, RefreshCw, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function StreamConfigPage() {
  const { user } = useAuth()
  const [showKey, setShowKey] = useState(false)
  const [regenerating, setRegenerating] = useState(false)

  const rtmpUrl = `rtmp://${process.env.NEXT_PUBLIC_RTMP_HOST || "stream.kwanzastream.ao"}:1935/live`

  const copy = async (text: string, label: string) => { await navigator.clipboard.writeText(text); toast.success(`${label} copiado!`) }

  const handleRegenerateKey = async () => {
    if (!confirm("Regenerar a stream key vai desligar qualquer transmissão activa. Continuar?")) return
    setRegenerating(true)
    try { await api.post("/api/users/me/stream-key"); toast.success("Nova stream key gerada! Recarrega a página para ver."); window.location.reload() }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao regenerar key") }
    finally { setRegenerating(false) }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="text-xl font-bold">Configurações do Stream</h1><p className="text-sm text-muted-foreground mt-1">Credenciais e configurações para o teu software de transmissão</p></div>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-base">Stream Key & RTMP</CardTitle><CardDescription>Usa estas credenciais no OBS Studio, Streamlabs ou outro software.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>RTMP Server</Label>
            <div className="flex gap-2"><Input value={rtmpUrl} readOnly className="font-mono text-sm bg-muted/30" /><Button variant="outline" size="icon" onClick={() => copy(rtmpUrl, "RTMP URL")}><Copy className="w-4 h-4" /></Button></div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between"><Label>Stream Key</Label><Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-muted-foreground" onClick={handleRegenerateKey} disabled={regenerating}><RefreshCw className={`w-3 h-3 ${regenerating ? "animate-spin" : ""}`} />Regenerar</Button></div>
            <div className="flex gap-2">
              <Input value={user?.streamKey || "—"} readOnly type={showKey ? "text" : "password"} className="font-mono text-sm bg-muted/30" />
              <Button variant="outline" size="icon" onClick={() => setShowKey((v) => !v)}>{showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
              <Button variant="outline" size="icon" onClick={() => copy(user?.streamKey || "", "Stream Key")}><Copy className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" /><p className="text-xs text-yellow-600 dark:text-yellow-400">Nunca partilhes a tua stream key. Qualquer pessoa com esta key pode transmitir no teu canal.</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-3">Como configurar no OBS Studio</p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {["Abre o OBS Studio", "Vai a Definições → Transmissão", 'Serviço: selecciona "Personalizado"', 'Copia o RTMP URL para o campo "Servidor"', 'Copia a Stream Key para o campo "Chave"', "Clica OK e começa a transmitir"].map((step, i) => (
                <li key={i} className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">{i + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-base">Qualidades recomendadas</CardTitle><CardDescription>Configurações optimizadas para redes angolanas</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "Alta (720p)", details: "1280×720 · 30fps · 2500kbps", recommended: "Fibra / WiFi", badge: "Recomendado" },
              { label: "Média (480p)", details: "854×480 · 30fps · 1200kbps", recommended: "4G / Mobile", badge: null },
              { label: "Baixa (360p)", details: "640×360 · 25fps · 600kbps", recommended: "3G / Dados limitados", badge: null },
            ].map((q) => (
              <div key={q.label} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                <div className="flex-1"><div className="flex items-center gap-2"><p className="text-sm font-medium">{q.label}</p>{q.badge && <Badge className="text-[10px] h-4 px-1.5">{q.badge}</Badge>}</div><p className="text-xs text-muted-foreground mt-0.5">{q.details}</p></div>
                <Badge variant="outline" className="text-xs shrink-0">{q.recommended}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
