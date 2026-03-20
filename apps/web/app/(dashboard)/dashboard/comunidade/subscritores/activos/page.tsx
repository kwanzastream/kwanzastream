"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ActivosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/subscritores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Subscritores Activos</h1></div>
      {[{u:"@sub_loyal",t:"Tier 1 · 12 meses"},{u:"@sub_new",t:"Tier 2 · 1 mês"},{u:"@sub_gift",t:"Tier 1 · 3 meses · 🎁 Gift"}].map(s => <CommunityMemberRow key={s.u} username={s.u} subtitle={s.t} />)}
    </div>
  )
}
