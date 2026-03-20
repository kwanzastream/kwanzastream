"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"
export default function SalosEnviarConfirmarPage() {
  const { username } = useParams()
  const router = useRouter()
  const [sending, setSending] = useState(false)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/salos/enviar/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Envio de Salos</h1></div>
      <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center space-y-2"><Heart className="w-8 h-8 text-yellow-400 mx-auto" /><p className="text-sm">Enviar para <span className="font-bold">@{username}</span></p><p className="text-2xl font-black text-yellow-400">100 Salos</p></div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={sending} onClick={() => { setSending(true); setTimeout(() => { toast.success(`💛 Salos enviados a @${username}!`); router.push("/wallet/saldo") }, 1500) }}>{sending ? <><Loader2 className="w-4 h-4 animate-spin" />A enviar...</> : <><Check className="w-4 h-4" />Confirmar</>}</Button>
    </div>
  )
}
