"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Crown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function MembroTier2Page() {
  const { username } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const benefits = [
    "Tudo do Tier 1",
    "15 emotes exclusivos do canal",
    "VODs exclusivos para membros",
    "Prioridade no chat",
    "Badge dourado",
    "Acesso a Q&A exclusivos",
  ]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
          <Link href={`/${username}/membro`}><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h2 className="font-semibold text-lg">Tier 2 — Membership</h2>
        <Badge className="bg-purple-500 text-white text-[10px]">Mais popular</Badge>
      </div>

      <div className="rounded-2xl border-2 border-purple-400/30 bg-purple-400/5 p-6 text-center space-y-4">
        <Crown className="w-12 h-12 text-purple-400 mx-auto" />
        <div>
          <p className="text-xl font-bold">Tier 2</p>
          <p className="text-3xl font-bold text-purple-400 mt-1">1.500 <span className="text-sm font-normal text-muted-foreground">Kz/mês</span></p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Benefícios incluídos</h3>
        <ul className="space-y-2.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>Comparar com <Link href={`/${username}/membro/tier-1`} className="text-primary hover:underline">Tier 1 (500 Kz)</Link> e <Link href={`/${username}/membro/tier-3`} className="text-primary hover:underline">Tier 3 (3.000 Kz)</Link></p>
      </div>

      <Button
        className="w-full"
        onClick={() => isAuthenticated ? null : router.push(`/registar?redirectTo=/${username}/membro/tier-2`)}
      >
        Tornar-me membro — 1.500 Kz/mês
      </Button>
      <p className="text-[11px] text-center text-muted-foreground">Multicaixa Express · e-Kwanza · Unitel Money</p>
    </div>
  )
}
