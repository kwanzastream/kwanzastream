"use client"
import { useParams } from "next/navigation"
import { PartyPopper, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubscricaoSucessoPage() {
  const { username } = useParams()
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <PartyPopper className="w-16 h-16 text-primary mx-auto" />
      <h2 className="text-2xl font-bold">Subscrito! 🎉</h2>
      <p className="text-sm text-muted-foreground">Agora és subscritor de @{username}</p>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-left space-y-1.5">{["Emojis exclusivos","Badge no chat","Sem anúncios"].map(b => <p key={b} className="text-xs flex items-center gap-2"><Check className="w-3 h-3 text-green-400" />{b}</p>)}</div>
      <div className="flex gap-3 justify-center"><Link href={`/${username}`}><Button>Ver canal</Button></Link><Link href="/subscricao/gerir"><Button variant="outline">Gerir subscrições</Button></Link></div>
    </div>
  )
}
