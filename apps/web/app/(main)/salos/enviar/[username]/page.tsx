"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Zap, ArrowLeft, Loader2 } from "lucide-react"

const AMOUNTS = [50, 200, 500, 1000, 2500, 5000]

export default function EnviarSalosPage() {
  const params = useParams()
  const username = params.username as string
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [creator, setCreator] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState(200)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    api.get(`/api/users/${username}`)
      .then((res) => setCreator(res.data.user || res.data))
      .catch(() => router.push("/explorar"))
      .finally(() => setLoading(false))
  }, [username])

  const handleSend = async () => {
    if (!creator) return
    setSending(true)
    try {
      await api.post("/api/donations/", { receiverId: creator.id, amount: selectedAmount, saloType: `SALO_${selectedAmount}`, message: message || undefined })
      await refreshUser()
      toast.success(`Enviaste ${selectedAmount} Salos para @${username}! 🎉`)
      router.push(`/${username}`)
    } catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao enviar Salos") }
    finally { setSending(false) }
  }

  if (loading) return <div className="max-w-sm mx-auto space-y-4 pt-8"><Skeleton className="h-20 rounded-xl" /><Skeleton className="h-40 rounded-xl" /></div>

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="flex items-center gap-3"><Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button><h1 className="text-xl font-bold">Enviar Salos</h1></div>
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/20">
        <Avatar className="w-12 h-12"><AvatarImage src={creator?.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{creator?.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
        <div><p className="font-semibold">{creator?.displayName}</p><p className="text-xs text-muted-foreground">@{creator?.username}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {AMOUNTS.map((amt) => (
          <button key={amt} onClick={() => setSelectedAmount(amt)} className={`p-3 rounded-xl border text-center transition-all ${selectedAmount === amt ? "border-[#F9D616] bg-[#F9D616]/10" : "border-border hover:border-muted-foreground"}`}>
            <Zap className="w-4 h-4 text-[#F9D616] mx-auto mb-1" /><p className="text-sm font-bold">{amt}</p><p className="text-[10px] text-muted-foreground">{amt} Kz</p>
          </button>
        ))}
      </div>
      <Input placeholder="Mensagem (opcional)" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={100} />
      <Button className="w-full bg-[#F9D616] text-black hover:bg-[#F9D616]/90" onClick={handleSend} disabled={sending}>{sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-1.5" />Enviar {selectedAmount} Salos</>}</Button>
      <p className="text-xs text-center text-muted-foreground">{creator?.displayName} recebe 80% ({Math.floor(selectedAmount * 0.8)} Kz)</p>
    </div>
  )
}
