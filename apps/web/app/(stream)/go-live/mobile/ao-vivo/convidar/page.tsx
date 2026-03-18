"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Users, Search, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function GoLiveMobileConvidarPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [inviting, setInviting] = useState(false)

  const handleInvite = async () => {
    if (!search.trim()) return
    setInviting(true)
    // TODO: api.post to send co-stream invite
    setTimeout(() => { setInviting(false); toast.success(`Convite enviado para @${search}!`) }, 1500)
  }

  return (
    <div className="h-screen flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><h3 className="text-sm font-bold">Convidar co-streamer</h3></div>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => router.back()}><X className="w-4 h-4" /></Button>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-xs text-muted-foreground">Convida outro criador para transmitir contigo. O convidado recebe uma notificação.</p>
        <div className="flex gap-2">
          <Input placeholder="@username" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white/5 border-white/10" />
          <Button onClick={handleInvite} disabled={!search.trim() || inviting} className="shrink-0">
            {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Convidar"}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground">O convite expira em 2 minutos se não for aceite.</p>
      </div>
    </div>
  )
}
