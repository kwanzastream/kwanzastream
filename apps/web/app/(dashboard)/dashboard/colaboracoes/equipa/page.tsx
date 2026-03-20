"use client"
import { TeamMemberRow } from "@/components/collaborations/collab-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function EquipaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">👥 Equipa</h1>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs font-bold">&ldquo;Angola Gaming Crew&rdquo;</p><p className="text-[8px] text-muted-foreground">4 membros</p></div>
      <div className="space-y-1"><TeamMemberRow username="@teu-canal" role="Fundador" isFounder /><TeamMemberRow username="@membro1" role="Membro" /><TeamMemberRow username="@membro2" role="Membro" /><TeamMemberRow username="@membro3" role="Co-fundador" /></div>
      <div className="space-y-1"><Link href="/dashboard/colaboracoes/equipa/gerir"><Button size="sm" className="w-full text-xs">Gerir equipa →</Button></Link></div>
    </div>
  )
}
