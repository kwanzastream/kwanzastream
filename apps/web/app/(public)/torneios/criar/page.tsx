"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

export default function TorneioCriarPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para criar torneios</p><Button onClick={() => router.push("/entrar?redirectTo=/torneios/criar")}>Entrar</Button></div>
  )
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/torneios"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Trophy className="w-5 h-5" />Criar Torneio</h1></div>
      <p className="text-sm text-muted-foreground">Cria o teu torneio em 7 passos. Disponível para Streamers Partner e acima.</p>
      <Link href="/torneios/criar/tipo"><Button className="w-full h-12 font-bold gap-2"><Trophy className="w-4 h-4" />Começar</Button></Link>
    </div>
  )
}
