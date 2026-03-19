"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const PRESETS = [50, 200, 500, 1000]

export default function GiftSalosUsernamePage() {
  const { username } = useParams()
  const router = useRouter()
  const [amount, setAmount] = useState(200)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  const kzCost = amount // 1 Salo = 1 Kz simplified

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/gift/salos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Oferecer Salos a @{username}</h1></div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-muted-foreground">Quantidade</p>
        <div className="flex gap-2">{PRESETS.map(p => <button key={p} onClick={() => setAmount(p)} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${amount === p ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10 border border-transparent"}`}>{p}</button>)}</div>
        <div className="flex items-center gap-2"><Input type="number" min={1} max={100000} value={amount} onChange={e => setAmount(Math.max(1, Number(e.target.value)))} className="bg-white/5 text-center" /><span className="text-xs text-muted-foreground shrink-0">Salos</span></div>
      </div>

      <div className="space-y-1"><p className="text-xs font-bold text-muted-foreground">Mensagem (opcional)</p><Input value={message} onChange={e => setMessage(e.target.value.slice(0, 150))} placeholder="Parabéns pelo stream! 🎉" className="bg-white/5" maxLength={150} /><p className="text-[9px] text-muted-foreground text-right">{message.length}/150</p></div>

      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Total</p><p className="text-xl font-black text-yellow-400 flex items-center gap-1"><Heart className="w-5 h-5" />{amount.toLocaleString()} Salos</p></div><p className="text-sm font-bold">{kzCost.toLocaleString()} Kz</p></div>

      <Button className="w-full h-12 gap-2 font-bold" onClick={() => { setSending(true); setTimeout(() => { toast.success(`💛 ${amount} Salos enviados a @${username}!`); router.push("/gift/enviados") }, 1500) }} disabled={sending}>{sending ? <><Loader2 className="w-4 h-4 animate-spin" />A enviar...</> : <><Heart className="w-4 h-4" />Confirmar</>}</Button>
    </div>
  )
}
