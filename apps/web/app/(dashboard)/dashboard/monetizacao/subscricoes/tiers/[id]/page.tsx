"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function TierDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes/tiers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Tier {id}</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input defaultValue={id === "1" ? "Fã" : id === "2" ? "Super Fã" : "VIP Angola"} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Benefícios adicionais</p>{["VODs exclusivos","Discord role (v2)","Acesso antecipado a streams","Badge especial"].map(b => <label key={b} className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">{b}</span></label>)}</div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Tier actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
