"use client"
import { ChurnRiskCard } from "@/components/membership/membership-components"
import { ArrowLeft, MessageSquare, Gift, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function RecuperarPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/membros/activos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Recuperar Membros</h1></div>
      <p className="text-xs text-muted-foreground">Membros que cancelaram há menos de 30 dias — ainda podes recuperá-los.</p>
      <ChurnRiskCard username="@exmembro1" tier={2} months={3} cancelDate="20 Mar" reason="Dificuldades financeiras" actions={<><Button size="sm" variant="outline" className="text-[8px] gap-0.5" onClick={() => toast.success("DM enviada!")}><MessageSquare className="w-2.5 h-2.5" />DM</Button><Button size="sm" variant="outline" className="text-[8px] gap-0.5" onClick={() => toast.success("1 mês grátis oferecido!")}><Gift className="w-2.5 h-2.5" />1 mês grátis</Button><Button size="sm" variant="outline" className="text-[8px] gap-0.5" onClick={() => toast.info("Downgrade para T1")}><ArrowDown className="w-2.5 h-2.5" />T1</Button></>} />
    </div>
  )
}
