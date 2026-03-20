"use client"
import { ApplicationStatusCard } from "@/components/programs/program-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function EstadoPartnerPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/programa-partner"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Estado da Candidatura</h1></div>
      <ApplicationStatusCard status="pending" date="Submetida: 20 Março 2026" detail="Resposta estimada: 30 Março 2026. Serás notificado por email e WhatsApp." />
      <p className="text-[10px] text-muted-foreground text-center">Enquanto esperas, continua a fazer streams! Os teus números são monitorizados em tempo real.</p>
    </div>
  )
}
