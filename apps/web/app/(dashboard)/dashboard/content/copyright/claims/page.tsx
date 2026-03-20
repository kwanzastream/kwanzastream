"use client"
import { CopyrightClaimCard } from "@/components/content-manager/content-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const CLAIMS = [
  {id:"1",content:"VOD: Kuduro DJ Set — 01:23:45",claimant:"Universal Music Group",type:"Monetização bloqueada",status:"resolved" as const},
  {id:"2",content:"VOD: Música ao vivo — 00:45:00",claimant:"Sony Music",type:"Apenas aviso",status:"resolved" as const},
]
export default function ClaimsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/copyright"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Claims</h1></div>
      {CLAIMS.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">Nenhum claim activo 🎉</p> : <div className="space-y-1.5">{CLAIMS.map(c => <Link key={c.id} href={`/dashboard/content/copyright/claims/${c.id}`}><CopyrightClaimCard {...c} /></Link>)}</div>}
    </div>
  )
}
