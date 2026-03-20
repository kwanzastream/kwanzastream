"use client"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function StreamsPrivadosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🔒 Streams Privados</h1>
      <div className="flex gap-1"><Link href="/dashboard/membership/perks-exclusivos/vods"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">VODs</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Streams</button><Link href="/dashboard/membership/perks-exclusivos/discord"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Discord</button></Link></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] font-bold">Próximo stream privado</p><p className="text-sm font-bold">5 Abril 2026 · 20h WAT</p><p className="text-[9px]">Q&A exclusivo com membros Tier 2+</p><div className="flex gap-1 mt-2"><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5"><Edit2 className="w-2.5 h-2.5" />Editar</Button><Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400 gap-0.5" onClick={() => toast.info("Cancelado")}><Trash2 className="w-2.5 h-2.5" />Cancelar</Button></div></div>
      <Button className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Agendar stream privado</Button>
    </div>
  )
}
