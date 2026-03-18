"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ChannelCard } from "@/components/channel/channel-card"

export default function EquipaMembroPage() {
  const { username, membro } = useParams()
  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/equipa`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Membro da equipa</h2>
      </div>
      <ChannelCard
        username={membro as string}
        displayName={membro as string}
        followersCount={0}
      />
      <Button asChild variant="outline" className="w-full">
        <Link href={`/${membro}`}>Ver canal completo</Link>
      </Button>
    </div>
  )
}
