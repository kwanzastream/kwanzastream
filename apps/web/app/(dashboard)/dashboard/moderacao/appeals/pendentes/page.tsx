"use client"
import { AppealCard } from "@/components/moderation/moderation-components"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function AppealsPendentesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📩 Appeals Pendentes</h1>
      <p className="text-xs font-bold text-yellow-400">1 apelo pendente</p>
      <Link href="/dashboard/moderacao/appeals/1"><AppealCard username="@exmembro" banDate="15 Mar" message="Fui banido por engano. Eu não estava a fazer spam, estava só a partilhar um link do WhatsApp." actions={<><Button size="sm" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("Ban levantado!") }}><Check className="w-2.5 h-2.5" />Aceitar</Button><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.info("Ban mantido") }}><X className="w-2.5 h-2.5" />Rejeitar</Button></>} /></Link>
    </div>
  )
}
