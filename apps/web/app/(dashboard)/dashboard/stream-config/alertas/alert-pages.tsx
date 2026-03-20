"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
function AlertConfig({ title, icon, defaultMsg, variables, extra }: { title: string; icon: string; defaultMsg: string; variables: string; extra?: React.ReactNode }) {
  const [active, setActive] = useState(true)
  const [dur, setDur] = useState("5")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-config/alertas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">{icon} {title}</h1></div>
      <label className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">Activar</span><input type="checkbox" checked={active} onChange={() => setActive(!active)} /></label>
      {extra}
      <div className="space-y-1"><p className="text-[10px] font-bold">Duração</p><div className="flex gap-1">{["3","5","10"].map(d => <button key={d} onClick={() => setDur(d)} className={`px-3 py-1 rounded text-xs ${dur === d ? "bg-primary text-primary-foreground" : "bg-white/5"}`}>{d}s</button>)}</div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Mensagem</p><Input defaultValue={defaultMsg} className="bg-white/5" /><p className="text-[8px] text-muted-foreground">Variáveis: {variables}</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Cor fundo</p><input type="color" defaultValue="#1a1a2e" className="w-8 h-8 rounded" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Cor texto</p><input type="color" defaultValue="#FFD700" className="w-8 h-8 rounded" /></div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Som</p><select className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Padrão</option><option>Festivo</option><option>Subtil</option><option>Kwanza Beat</option><option>Sem som</option></select></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-center"><p className="text-[8px] text-muted-foreground mb-1">Preview</p><p className="text-sm font-bold" style={{color:"#FFD700"}}>🎉 {defaultMsg.replace("{username}","@superfan")}</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Alerta guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
export function FollowsAlert() { return <AlertConfig title="Follows" icon="👤" defaultMsg="{username} começou a seguir!" variables="{username}" /> }
export function SubsAlert() { return <AlertConfig title="Subscrições" icon="⭐" defaultMsg="{username} subscreveu Tier {tier}!" variables="{username}, {tier}" /> }
export function SalosAlert() { return <AlertConfig title="Salos" icon="💰" defaultMsg="{username} enviou {valor} Kz!" variables="{username}, {valor}" extra={<div className="space-y-1"><p className="text-[10px] font-bold">Valor mínimo para alerta</p><Input type="number" defaultValue={200} className="bg-white/5 w-24" /><p className="text-[8px] text-muted-foreground">Kz</p></div>} /> }
export function RaidsAlert() { return <AlertConfig title="Raids" icon="⚔️" defaultMsg="{username} fez raid com {viewers} viewers!" variables="{username}, {viewers}" /> }
export function AchievementsAlert() { return <AlertConfig title="Achievements" icon="🏆" defaultMsg="{username} desbloqueou uma conquista!" variables="{username}" /> }
