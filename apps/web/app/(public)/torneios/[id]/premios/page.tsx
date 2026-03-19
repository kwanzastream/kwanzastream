"use client"
import { useParams } from "next/navigation"
import { PrizeStructure } from "@/components/tournaments/prize-structure"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PRIZES = [
  { position: "1º Lugar", amount: "50.000 Kz", description: "Prémio monetário + troféu", sponsor: "Unitel" },
  { position: "2º Lugar", amount: "20.000 Kz", description: "Prémio monetário" },
  { position: "3º Lugar", amount: "10.000 Kz", description: "Prémio monetário" },
  { position: "4º Lugar", amount: "5.000 Kz" },
  { position: "MVP do Torneio", description: "Headset gaming + 1000 Salos", sponsor: "BAI" },
]

export default function TorneioPremiosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Prémios</h1></div>
      <PrizeStructure prizes={PRIZES} />
    </div>
  )
}
