"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Trophy } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function TorneioInscreverConfirmarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => { toast.success("Inscrição confirmada! Boa sorte 🏆"); router.push(`/torneios/${id}`) }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/inscrever`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Confirmar Inscrição</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-3 text-center">
        <Trophy className="w-10 h-10 text-primary mx-auto" />
        <h2 className="text-lg font-bold">Torneio FIFA 25 — Luanda Cup</h2>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>🎮 FIFA 25 · Individual</p>
          <p>📅 27 Mar 2026, 18:00 WAT</p>
          <p>🏆 Prémio: 50.000 Kz</p>
          <p>💰 Taxa de inscrição: Grátis</p>
        </div>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={handleConfirm} disabled={confirming}>
        {confirming ? <><Loader2 className="w-4 h-4 animate-spin" />A confirmar...</> : <><Check className="w-4 h-4" />Confirmar Inscrição</>}
      </Button>
      <p className="text-[8px] text-muted-foreground text-center">Receberás confirmação por email/WhatsApp</p>
    </div>
  )
}
