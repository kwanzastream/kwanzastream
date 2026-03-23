"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
export default function PartilharSMSPage() {
  const code = "KWANZA123"
  const msg = `Junta-te ao Kwanza Stream! Usa o meu link e ganha 100 Salos: kwanzastream.ao/r/${code}`
  const [phone, setPhone] = useState("")
  const send = () => { window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`) }
  return (
    <div className="max-w-sm mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Partilhar por SMS</h1>
      <div><label className="text-[10px] text-muted-foreground">Para</label><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+244 9XX XXX XXX" className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-[10px] text-muted-foreground">Mensagem:</p><p className="text-xs mt-1">{msg}</p></div>
      <Button onClick={send} className="w-full text-xs">Enviar SMS →</Button>
    </div>
  )
}
