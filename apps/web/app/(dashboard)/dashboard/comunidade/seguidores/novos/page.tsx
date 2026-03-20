"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const NEW = [{u:"@new_fan1",time:"2h atrás",source:"Stream ao vivo"},{u:"@new_fan2",time:"5h atrás",source:"Raid de @gamer_ao"},{u:"@new_fan3",time:"12h atrás",source:"Pesquisa"},{u:"@new_fan4",time:"1d atrás",source:"Partilha WhatsApp"}]
export default function NovosSeguidoresPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/seguidores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">⚡ Novos Seguidores (48h)</h1></div>
      <div className="space-y-1">{NEW.map(f => <CommunityMemberRow key={f.u} username={f.u} subtitle={`${f.time} · via ${f.source}`} actions={<Button size="sm" variant="outline" className="text-[8px] gap-0.5 h-6" onClick={() => toast.success("DM aberta!")}><MessageSquare className="w-2.5 h-2.5" />Agradecer</Button>} />)}</div>
    </div>
  )
}
