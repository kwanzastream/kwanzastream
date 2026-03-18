"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function MembroTier1Page() {
  const { username } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const benefits = [
    "Badge de subscritor Tier 1",
    "5 emotes exclusivos do canal",
    "Chat sem modo lento",
    "Cor de nome personalizada no chat",
    "Acesso a sorteios exclusivos",
  ]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
          <Link href={`/${username}/membro`}><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h2 className="font-semibold text-lg">Tier 1 — Membership</h2>
      </div>

      <div className="rounded-2xl border-2 border-blue-400/30 bg-blue-400/5 p-6 text-center space-y-4">
        <Star className="w-12 h-12 text-blue-400 mx-auto" />
        <div>
          <p className="text-xl font-bold">Tier 1</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">500 <span className="text-sm font-normal text-muted-foreground">Kz/mês</span></p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Benefícios incluídos</h3>
        <ul className="space-y-2.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>Comparar com <Link href={`/${username}/membro/tier-2`} className="text-primary hover:underline">Tier 2 (1.500 Kz)</Link> e <Link href={`/${username}/membro/tier-3`} className="text-primary hover:underline">Tier 3 (3.000 Kz)</Link></p>
      </div>

      <Button
        className="w-full"
        onClick={() => isAuthenticated ? null : router.push(`/registar?redirectTo=/${username}/membro/tier-1`)}
      >
        Tornar-me membro — 500 Kz/mês
      </Button>
      <p className="text-[11px] text-center text-muted-foreground">Multicaixa Express · e-Kwanza · Unitel Money</p>
    </div>
  )
}
