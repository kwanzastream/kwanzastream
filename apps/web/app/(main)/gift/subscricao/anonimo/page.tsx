"use client"
import { ArrowLeft, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GiftAnonimoPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/gift/subscricao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><EyeOff className="w-5 h-5" />Gift Anónimo</h1></div>
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <h2 className="text-sm font-bold">Como funciona</h2>
        <ul className="text-xs text-muted-foreground space-y-2">
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>O destinatário vê: <em>"🎁 Um fã anónimo ofereceu uma subscrição!"</em></li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>O streamer <strong>não</strong> sabe quem foi</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>No chat aparece sem identificação do remetente</li>
        </ul>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold flex items-center gap-1"><Shield className="w-3 h-3 text-primary" />Privacidade</p>
        <p className="text-[10px] text-muted-foreground">A plataforma regista a transacção para prevenção de fraude, mas a identidade nunca é revelada ao streamer ou ao destinatário.</p>
      </div>
      <Link href="/gift/subscricao"><Button className="w-full">Continuar para oferecer</Button></Link>
    </div>
  )
}
