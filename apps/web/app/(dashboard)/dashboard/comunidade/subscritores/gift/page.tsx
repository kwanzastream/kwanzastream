"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function GiftPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/subscritores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎁 Gift Subs</h1></div>
      {[{u:"@sub_gift",t:"Oferecido por @generous · Tier 1 · Expira 15 Abr"},{u:"@sub_gift2",t:"Oferecido por Anónimo · Tier 1 · Expira 20 Abr"}].map(s => <CommunityMemberRow key={s.u} username={s.u} subtitle={s.t} badges={["🎁"]} />)}
    </div>
  )
}
