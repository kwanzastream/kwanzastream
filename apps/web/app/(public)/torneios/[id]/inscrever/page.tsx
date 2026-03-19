"use client"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, User, Lock } from "lucide-react"
import Link from "next/link"

export default function TorneioInscreverPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para inscrever</p><Button onClick={() => router.push(`/entrar?redirectTo=/torneios/${id}/inscrever`)}>Entrar</Button></div>
  )

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Inscrição</h1></div>
      <div className="grid grid-cols-2 gap-4">
        <Link href={`/torneios/${id}/inscrever/individual`} className="p-8 rounded-2xl border border-white/10 hover:border-primary/30 bg-white/[0.02] hover:bg-primary/5 flex flex-col items-center gap-3 transition-all group">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"><User className="w-6 h-6 text-primary" /></div>
          <p className="font-bold text-sm">Individual</p>
        </Link>
        <Link href={`/torneios/${id}/inscrever/equipa`} className="p-8 rounded-2xl border border-white/10 hover:border-primary/30 bg-white/[0.02] hover:bg-primary/5 flex flex-col items-center gap-3 transition-all group">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20"><Users className="w-6 h-6 text-primary" /></div>
          <p className="font-bold text-sm">Equipa</p>
        </Link>
      </div>
    </div>
  )
}
