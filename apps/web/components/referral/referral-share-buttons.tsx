"use client"
import { toast } from "sonner"
interface ReferralShareButtonsProps { code: string; message?: string }
export function ReferralShareButtons({ code, message }: ReferralShareButtonsProps) {
  const link = `https://kwanzastream.ao/r/${code}`
  const text = message || `Estou no Kwanza Stream — a plataforma de streaming de Angola! 🇦🇴\nRegista-te com o meu link e ganha 100 Salos grátis:\n${link}`
  const copy = () => { navigator.clipboard.writeText(link).then(() => toast.success("Link copiado!")) }
  const shareWA = () => { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`) }
  const shareSMS = () => { window.open(`sms:?body=${encodeURIComponent(text)}`) }
  return (
    <div className="space-y-2">
      <button onClick={shareWA} className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors">↗️ Partilhar no WhatsApp</button>
      <button onClick={shareSMS} className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs transition-colors">📱 Partilhar por SMS</button>
      <button onClick={copy} className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-muted-foreground transition-colors">📋 Copiar link</button>
    </div>
  )
}
