"use client"
import { useState } from "react"
import { toast } from "sonner"
interface WatchPartyInviteProps { partyId: string; code: string }
export function WatchPartyInvite({ partyId, code }: WatchPartyInviteProps) {
  const [username, setUsername] = useState("")
  const link = `https://kwanzastream.ao/assistir-junto/${partyId}`
  const copy = () => { navigator.clipboard.writeText(link).then(() => toast.success("Link copiado!")) }
  const shareWA = () => { window.open(`https://wa.me/?text=${encodeURIComponent(`Junta-te à minha Watch Party no Kwanza Stream! 🎬\n\nCódigo: ${code}\nLink: ${link}`)}`) }
  return (
    <div className="space-y-4">
      <div><label className="text-[10px] text-muted-foreground">Link de convite</label><div className="flex gap-1 mt-1"><input value={link} readOnly className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-[10px] text-muted-foreground" /><button onClick={copy} className="px-3 py-2 rounded-lg bg-primary text-white text-[10px]">📋 Copiar</button></div></div>
      <div><label className="text-[10px] text-muted-foreground">Código curto</label><p className="text-lg font-black tracking-[0.3em] mt-1">{code}</p><p className="text-[9px] text-muted-foreground">Para partilhar verbalmente</p></div>
      <button onClick={shareWA} className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors">↗️ Partilhar no WhatsApp</button>
      <div><label className="text-[10px] text-muted-foreground">Convidar directamente</label><div className="flex gap-1 mt-1"><input value={username} onChange={e => setUsername(e.target.value)} placeholder="@username" className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /><button onClick={() => { if (username) { toast.success(`Convite enviado para @${username}`); setUsername("") } }} className="px-3 py-2 rounded-lg border border-white/10 text-[10px]">Convidar</button></div></div>
    </div>
  )
}
