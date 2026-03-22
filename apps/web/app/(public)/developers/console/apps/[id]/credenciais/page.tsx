"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft, Copy, Check, Eye, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function CredenciaisPage() {
  const { id } = useParams()
  const [creds, setCreds] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSecret, setShowSecret] = useState(false)
  const [copied, setCopied] = useState("")

  useEffect(() => { api.get(`/api/developer/apps/${id}/credentials`).then(r => setCreds(r.data)).catch(() => {}).finally(() => setLoading(false)) }, [id])

  const copy = (text: string, field: string) => { navigator.clipboard.writeText(text); setCopied(field); setTimeout(() => setCopied(""), 2000) }
  const rotate = async () => {
    if (!confirm("Regenerar Client Secret? O actual será invalidado.")) return
    try { const r = await api.post(`/api/developer/apps/${id}/credentials/rotate`); setCreds((c: any) => ({ ...c, clientSecret: r.data.clientSecret })); toast.success("Secret regenerado") }
    catch { toast.error("Erro") }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!creds) return <div className="text-center py-20 text-muted-foreground">Credenciais indisponíveis</div>

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />App</Link>
      <h1 className="text-xl font-bold">Credenciais</h1>
      <div className="p-4 rounded-xl border border-white/10 space-y-4">
        <div><p className="text-xs text-muted-foreground">Client ID</p>
          <div className="flex items-center gap-2 mt-1"><code className="text-sm font-mono text-primary flex-1 break-all">{creds.clientId}</code>
            <Button variant="outline" size="sm" className="shrink-0 h-7" onClick={() => copy(creds.clientId, "id")}>{copied === "id" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}</Button></div></div>
        <div><p className="text-xs text-muted-foreground">Client Secret</p>
          <div className="flex items-center gap-2 mt-1"><code className="text-sm font-mono flex-1 break-all">{showSecret ? creds.clientSecret : "•".repeat(32)}</code>
            <Button variant="outline" size="sm" className="shrink-0 h-7" onClick={() => { setShowSecret(true); copy(creds.clientSecret, "secret") }}>{showSecret ? (copied === "secret" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />) : <Eye className="w-3 h-3" />}</Button></div></div>
      </div>
      <Button variant="outline" onClick={rotate} className="w-full gap-1.5 text-red-400"><RefreshCw className="w-3.5 h-3.5" />Regenerar Secret</Button>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">⚠️ O Client Secret só é mostrado aqui. Guarda-o em segurança.</div>
    </div>
  )
}
