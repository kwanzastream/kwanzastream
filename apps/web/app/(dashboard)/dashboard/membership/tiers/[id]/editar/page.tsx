"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EditarTierPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/membership/tiers/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Tier {id}</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome (máx 30)</p><Input defaultValue={id === "1" ? "Fã" : id === "2" ? "Super Fã" : "VIP Angola"} maxLength={30} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição (máx 150)</p><textarea rows={2} defaultValue="Para os fãs mais dedicados do canal" maxLength={150} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Cor de destaque</p><input type="color" defaultValue="#FFD700" className="w-10 h-10 rounded" /></div>
      <p className="text-[8px] text-muted-foreground">⚠️ Preço não é editável (fixo pela plataforma).</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Tier actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
