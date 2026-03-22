"use client"
import { useParams } from "next/navigation"
import { WatchPartyChat } from "@/components/watch-party/watch-party-chat"
import Link from "next/link"
export default function WatchPartyChatPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-2">
      <div className="flex items-center justify-between"><h1 className="text-sm font-bold">Chat da Party</h1><Link href={`/assistir-junto/${id}`} className="text-[10px] text-primary hover:underline">← Ver stream</Link></div>
      <div className="h-[70vh] rounded-xl border border-white/10 overflow-hidden"><WatchPartyChat partyId={id as string} username="tu" /></div>
    </div>
  )
}
