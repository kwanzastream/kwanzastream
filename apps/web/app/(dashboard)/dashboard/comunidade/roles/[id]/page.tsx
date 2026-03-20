"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CommunityMemberRow } from "@/components/community/community-components"
import { toast } from "sonner"
import Link from "next/link"
export default function RoleDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/roles"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏆 Embaixador do canal</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Membros (5)</p>{["@member1","@member2","@member3"].map(m => <CommunityMemberRow key={m} username={m} subtitle="Embaixador" />)}</div>
      <div className="flex gap-1"><Input placeholder="Adicionar membro..." className="bg-white/5 text-xs" /><Button size="sm" className="gap-1 text-xs"><UserPlus className="w-3 h-3" /></Button></div>
    </div>
  )
}
