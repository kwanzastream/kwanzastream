"use client"
import { TeamMemberRow } from "@/components/collaborations/collab-components"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function MembrosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">👥 Membros</h1>
      <TeamMemberRow username="@teu-canal" role="Fundador" isFounder />
      <TeamMemberRow username="@membro3" role="Co-fundador" actions={<Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400" onClick={() => toast.info("Removido")}>Remover</Button>} />
      <TeamMemberRow username="@membro1" role="Membro" actions={<div className="flex gap-1"><Button size="sm" variant="outline" className="text-[8px] h-6" onClick={() => toast.success("Promovido!")}>Promover</Button><Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400" onClick={() => toast.info("Removido")}>Remover</Button></div>} />
      <TeamMemberRow username="@membro2" role="Membro" actions={<div className="flex gap-1"><Button size="sm" variant="outline" className="text-[8px] h-6" onClick={() => toast.success("Promovido!")}>Promover</Button><Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400" onClick={() => toast.info("Removido")}>Remover</Button></div>} />
      <Link href="/dashboard/colaboracoes/equipa/membros/convidar"><Button variant="outline" size="sm" className="w-full text-xs">+ Convidar membro</Button></Link>
    </div>
  )
}
