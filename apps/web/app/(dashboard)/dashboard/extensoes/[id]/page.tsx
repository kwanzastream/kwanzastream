"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const EXTS: Record<string,{icon:string;name:string;desc:string;positions:string[]}> = {"goals-bar":{icon:"🎯",name:"Goals Bar",desc:"Mostra uma barra de progresso para os teus objectivos de stream (seguidores, Salos, horas). Viewers podem ver o progresso em tempo real.",positions:["Painel","Overlay","Componente"]},"salos-alert":{icon:"💛",name:"Salos Alert",desc:"Alertas visuais de Salos ao vivo com animações e sons personalizáveis.",positions:["Overlay"]},"viewer-stats":{icon:"📊",name:"Viewer Stats",desc:"Contador de viewers e actividade do chat em tempo real.",positions:["Overlay","Componente"]},"now-playing":{icon:"🎵",name:"Now Playing",desc:"Mostra a música a tocar actualmente (integração Spotify).",positions:["Overlay","Painel"]},"live-poll":{icon:"🗳️",name:"Live Poll",desc:"Poll interactivo integrado no stream. Viewers votam em tempo real.",positions:["Painel","Overlay"]}}
export default function ExtensionDetailPage() {
  const { id } = useParams()
  const ext = EXTS[id as string] || EXTS["goals-bar"]
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/extensoes/explorar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">{ext.icon} {ext.name}</h1></div>
      <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center"><span className="text-4xl">{ext.icon}</span><p className="text-[8px] text-muted-foreground mt-2">Preview</p></div>
      <div className="space-y-1">{[{l:"Autor",v:"Kwanza Stream"},{l:"Versão",v:"1.2.0"},{l:"Actualizada",v:"15 Mar 2026"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <p className="text-xs">{ext.desc}</p>
      <div className="space-y-1"><p className="text-[10px] font-bold">Posições suportadas</p>{ext.positions.map((p,i) => <label key={p} className="flex items-center gap-2 py-0.5"><input type="radio" name="pos" defaultChecked={i===0} /><span className="text-xs">{p}</span></label>)}</div>
      <div className="flex gap-2"><Button className="flex-1 text-xs" onClick={() => toast.success("Instalada!")}>Instalar</Button><Link href={`/dashboard/extensoes/${id}/configurar`} className="flex-1"><Button variant="outline" className="w-full text-xs">Configurar</Button></Link><Link href={`/dashboard/extensoes/${id}/analytics`}><Button variant="outline" className="text-xs">📊</Button></Link></div>
    </div>
  )
}
