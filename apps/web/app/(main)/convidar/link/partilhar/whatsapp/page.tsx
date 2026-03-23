"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
export default function PartilharWhatsAppPage() {
  const code = "KWANZA123"
  const defaultMsg = `Estou no Kwanza Stream — a plataforma de streaming de Angola! 🇦🇴\nRegista-te com o meu link e ganha 100 Salos grátis:\nhttps://kwanzastream.ao/r/${code}`
  const [msg, setMsg] = useState(defaultMsg)
  const share = () => { window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`) }
  return (
    <div className="max-w-sm mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Partilhar no WhatsApp</h1>
      <div><label className="text-[10px] text-muted-foreground">Mensagem (editável)</label><textarea value={msg} onChange={e => setMsg(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[120px]" /></div>
      <Button onClick={share} className="w-full bg-green-600 hover:bg-green-700 text-xs">Abrir WhatsApp →</Button>
    </div>
  )
}
