"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

const EVENTS = ["stream.online", "stream.offline", "channel.follow", "channel.unfollow", "channel.subscribe", "channel.unsubscribe", "donations.received", "chat.message"]

export default function CriarWebhookPage() {
  const { id } = useParams()
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [events, setEvents] = useState<string[]>([])
  const [creating, setCreating] = useState(false)

  const toggle = (e: string) => setEvents(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e])
  const handleCreate = async () => {
    if (!url || !events.length) return toast.error("URL e pelo menos 1 evento obrigatórios")
    setCreating(true)
    try { await api.post(`/api/developer/apps/${id}/webhooks`, { url, events }); toast.success("Webhook criado"); router.push(`/developers/console/apps/${id}/webhooks`) }
    catch { toast.error("Erro") }
    finally { setCreating(false) }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <Link href={`/developers/console/apps/${id}/webhooks`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Webhooks</Link>
      <h1 className="text-xl font-bold">Criar Webhook</h1>
      <div><label className="text-xs text-muted-foreground">URL do endpoint</label><input value={url} onChange={e => setUrl(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-sm focus:border-primary focus:outline-none" placeholder="https://myapp.ao/webhooks" /></div>
      <div><label className="text-xs text-muted-foreground">Eventos</label>
        <div className="grid grid-cols-2 gap-2 mt-2">{EVENTS.map(e => (
          <button key={e} onClick={() => toggle(e)} className={`p-2 rounded-lg border text-[10px] font-mono text-left ${events.includes(e) ? "border-primary bg-primary/5" : "border-white/10"}`}>{e}</button>
        ))}</div></div>
      <Button onClick={handleCreate} disabled={creating} className="w-full">{creating && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}Criar webhook</Button>
    </div>
  )
}
