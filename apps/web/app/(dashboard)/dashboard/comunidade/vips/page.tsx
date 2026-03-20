"use client"
import { CommunityMemberRow } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const VIPS = [{u:"@vip_gamer",date:"10 Mar 2026",reason:"Top chatter"},{u:"@vip_music",date:"5 Mar 2026",reason:"DJ convidado"}]
export default function VipsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">💎 VIPs</h1><Link href="/dashboard/comunidade/vips/gerir"><Button size="sm" className="text-xs">Gerir VIPs</Button></Link></div>
      <p className="text-xs text-muted-foreground">{VIPS.length}/100 VIPs · Ignoram slow mode · Usam emotes sem sub</p>
      <div className="space-y-1">{VIPS.map(v => <CommunityMemberRow key={v.u} username={v.u} subtitle={`VIP desde ${v.date} · ${v.reason}`} badges={["💎"]} />)}</div>
    </div>
  )
}
