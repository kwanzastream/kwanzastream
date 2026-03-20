"use client"
import { BanCard } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PermanentesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Bans Permanentes</h1>
      <div className="flex gap-1"><Link href="/dashboard/comunidade/banidos/temporarios"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Temporários</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Permanentes</button><Link href="/dashboard/comunidade/banidos/apelar"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Apelos</button></Link></div>
      <BanCard username="@abuser" reason="Assédio repetido" bannedBy="Streamer" duration="Permanente" />
      <Button variant="outline" size="sm" className="w-full text-[9px]" onClick={() => { if (confirm("Levantar ban permanente?")) toast.success("Ban levantado!") }}>Levantar ban (requer confirmação)</Button>
    </div>
  )
}
