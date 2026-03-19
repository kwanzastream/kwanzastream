"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Coins, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

export default function RewardResgatarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [redeeming, setRedeeming] = useState(false)

  const handleRedeem = () => {
    setRedeeming(true)
    setTimeout(() => { toast.success("Reward resgatado! O streamer foi notificado."); router.push("/rewards/activos") }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href={`/rewards/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Resgate</h1></div>
      <div className="p-6 rounded-2xl border border-white/10 space-y-3 text-center">
        <p className="text-sm font-bold">Resgatar: Escolhe a próxima música</p>
        <p className="text-[10px] text-muted-foreground">Canal: @kuduro_master</p>
        <div className="flex items-center justify-center gap-4 py-3">
          <div className="text-center"><p className="text-[9px] text-muted-foreground">Custo</p><p className="text-lg font-bold text-yellow-400 flex items-center gap-1"><Coins className="w-4 h-4" />500</p></div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><p className="text-[9px] text-muted-foreground">Os teus pontos</p><p className="text-lg font-bold">1.234</p></div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><p className="text-[9px] text-muted-foreground">Após resgate</p><p className="text-lg font-bold text-green-400">734</p></div>
        </div>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={handleRedeem} disabled={redeeming}>{redeeming ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Confirmar Resgate</>}</Button>
      <p className="text-[8px] text-muted-foreground text-center">O streamer recebe notificação imediata</p>
    </div>
  )
}
