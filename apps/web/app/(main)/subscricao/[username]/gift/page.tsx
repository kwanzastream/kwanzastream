"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubscricaoGiftPage() {
  const { username } = useParams()
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <Gift className="w-16 h-16 text-primary mx-auto" />
      <h2 className="text-lg font-bold">Oferecer subscrição para @{username}</h2>
      <p className="text-xs text-muted-foreground">Escolhe o tipo de gift na página dedicada.</p>
      <Link href={`/gift/subscricao/${username}`}><Button className="gap-1"><Gift className="w-4 h-4" />Ir para Gifting</Button></Link>
      <Link href={`/subscricao/${username}`} className="block text-[10px] text-primary hover:underline">← Voltar para subscrição</Link>
    </div>
  )
}
