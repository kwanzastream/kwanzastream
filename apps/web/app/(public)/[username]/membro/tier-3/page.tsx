"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Gem } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function MembroTier3Page() {
  const { username } = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const benefits = [
    "Tudo do Tier 2",
    "30+ emotes (todos desbloqueados)",
    "Shoutout mensal no stream",
    "Acesso a Discord / grupo VIP",
    "Badge animado exclusivo",
    "Nome nos créditos do canal",
    "Acesso antecipado a conteúdo",
    "Sorteios mensais exclusivos Tier 3",
  ]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
          <Link href={`/${username}/membro`}><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h2 className="font-semibold text-lg">Tier 3 — Membership</h2>
      </div>

      <div className="rounded-2xl border-2 border-amber-400/30 bg-amber-400/5 p-6 text-center space-y-4">
        <Gem className="w-12 h-12 text-amber-400 mx-auto" />
        <div>
          <p className="text-xl font-bold">Tier 3</p>
          <p className="text-3xl font-bold text-amber-400 mt-1">3.000 <span className="text-sm font-normal text-muted-foreground">Kz/mês</span></p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Benefícios incluídos</h3>
        <ul className="space-y-2.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>Comparar com <Link href={`/${username}/membro/tier-1`} className="text-primary hover:underline">Tier 1 (500 Kz)</Link> e <Link href={`/${username}/membro/tier-2`} className="text-primary hover:underline">Tier 2 (1.500 Kz)</Link></p>
      </div>

      <Button
        className="w-full"
        onClick={() => isAuthenticated ? null : router.push(`/registar?redirectTo=/${username}/membro/tier-3`)}
      >
        Tornar-me membro — 3.000 Kz/mês
      </Button>
      <p className="text-[11px] text-center text-muted-foreground">Multicaixa Express · e-Kwanza · Unitel Money</p>
    </div>
  )
}
