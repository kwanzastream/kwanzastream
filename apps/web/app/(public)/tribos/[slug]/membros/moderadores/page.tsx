"use client"
import { useParams } from "next/navigation"
import { TribeMemberCard, type TribeMember } from "@/components/tribes/tribe-member-card"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MODS: TribeMember[] = [
  { username: "kuduro_master", displayName: "Kuduro Master", role: "founder", joinedAt: new Date(Date.now() - 31536000000).toISOString() },
  { username: "danca_ao", displayName: "Dança AO", role: "moderator", joinedAt: new Date(Date.now() - 15768000000).toISOString() },
]

export default function TriboModeradoresPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/membros`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-blue-400" />Moderadores</h1></div>
      <div className="space-y-2">{MODS.map(m => <TribeMemberCard key={m.username} member={m} />)}</div>
    </div>
  )
}
