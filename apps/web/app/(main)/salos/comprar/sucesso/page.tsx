"use client"
import { Heart, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SalosSucessoPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <PartyPopper className="w-16 h-16 text-yellow-400 mx-auto" />
      <h2 className="text-2xl font-bold">Salos creditados! 🎉</h2>
      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Heart className="w-4 h-4 text-yellow-400" />200 Salos adicionados à tua conta</p>
      <div className="flex gap-3 justify-center"><Link href="/"><Button>Explorar streams</Button></Link><Link href="/wallet/saldo"><Button variant="outline">Ver saldo</Button></Link></div>
    </div>
  )
}
