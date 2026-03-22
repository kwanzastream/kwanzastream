"use client"
import { useParams } from "next/navigation"
import { WatchPartyInvite } from "@/components/watch-party/watch-party-invite"
import Link from "next/link"
export default function ConvidarPage() {
  const { id } = useParams()
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <Link href={`/assistir-junto/${id}`} className="text-[10px] text-muted-foreground hover:text-foreground">← Voltar à party</Link>
      <h1 className="text-lg font-bold">Convidar para a Watch Party</h1>
      <WatchPartyInvite partyId={id as string} code="ABC123" />
    </div>
  )
}
