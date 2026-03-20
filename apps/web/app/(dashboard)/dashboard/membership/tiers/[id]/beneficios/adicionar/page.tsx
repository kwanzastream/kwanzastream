"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const BENEFITS = [{icon:"🎨",title:"Cor de nome no chat",desc:"Color picker + preview"},{icon:"🏷️",title:"Badge exclusivo",desc:"Upload badge exclusivo"},{icon:"😀",title:"Emotes exclusivos",desc:"Emotes só para este tier"},{icon:"📹",title:"VODs privados",desc:"Marcar VODs como exclusivos"},{icon:"🔒",title:"Streams privados",desc:"Streams visíveis só para membros"},{icon:"🎮",title:"Discord role",desc:"Requer integração Discord"},{icon:"⏰",title:"Acesso antecipado",desc:"5/10/15/30 min antes"}]
export default function AdicionarBeneficioPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/membership/tiers/${id}/beneficios`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Adicionar Benefício</h1></div>
      {BENEFITS.map(b => <button key={b.title} onClick={() => toast.success(`${b.title} adicionado!`)} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20 w-full text-left"><span className="text-lg">{b.icon}</span><div><p className="text-xs font-bold">{b.title}</p><p className="text-[8px] text-muted-foreground">{b.desc}</p></div></button>)}
    </div>
  )
}
