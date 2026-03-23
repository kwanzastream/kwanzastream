"use client"
import { toast } from "sonner"
interface ReferralLinkCardProps { code: string; clicks: number; registrations: number }
export function ReferralLinkCard({ code, clicks, registrations }: ReferralLinkCardProps) {
  const link = `https://kwanzastream.ao/r/${code}`
  const copy = () => { navigator.clipboard.writeText(link).then(() => toast.success("Link copiado!")) }
  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-3">
      <label className="text-[10px] text-muted-foreground">O teu link de convite</label>
      <div className="flex gap-1"><input value={link} readOnly className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-muted-foreground font-mono" /><button onClick={copy} className="px-3 py-2 rounded-lg bg-primary text-white text-[10px]">📋</button></div>
      <div className="flex items-center gap-4 text-[9px] text-muted-foreground"><span>Cliques: <span className="text-foreground font-bold">{clicks}</span></span><span>Registos: <span className="text-foreground font-bold">{registrations}</span></span>{clicks > 0 && <span>Conversão: <span className="text-foreground font-bold">{Math.round((registrations / clicks) * 100)}%</span></span>}</div>
    </div>
  )
}
