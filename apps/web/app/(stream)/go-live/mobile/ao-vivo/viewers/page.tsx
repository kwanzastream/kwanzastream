"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Shield, ShieldOff, Eye, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const MOCK_VIEWERS = [
  { username: "viewer1", displayName: "Pedro Luanda", badges: ["subscriber"] },
  { username: "viewer2", displayName: "Maria Benguela", badges: [] },
  { username: "mod1", displayName: "Moderador AO", badges: ["moderator"] },
  { username: "vip1", displayName: "VIP Fan", badges: ["vip"] },
]

export default function GoLiveMobileViewersPage() {
  const router = useRouter()
  return (
    <div className="h-screen flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-bold">Viewers ({MOCK_VIEWERS.length})</h3>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => router.back()}><X className="w-4 h-4" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {MOCK_VIEWERS.map((v) => (
          <div key={v.username} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
            <Avatar className="w-8 h-8"><AvatarFallback className="text-[10px] bg-primary/20 text-primary">{v.displayName.slice(0, 2)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{v.displayName}</p>
              <p className="text-[10px] text-muted-foreground">@{v.username}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="w-7 h-7" title="Promover a VIP" onClick={() => toast.success(`${v.displayName} agora é VIP 👑`)}><Crown className="w-3 h-3 text-[#F9D616]" /></Button>
              <Button variant="ghost" size="icon" className="w-7 h-7" title="Banir do chat" onClick={() => toast.success(`${v.displayName} banido do chat`)}><ShieldOff className="w-3 h-3 text-red-400" /></Button>
              <Button variant="ghost" size="icon" className="w-7 h-7" title="Ver perfil" onClick={() => router.push(`/${v.username}`)}><Eye className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
