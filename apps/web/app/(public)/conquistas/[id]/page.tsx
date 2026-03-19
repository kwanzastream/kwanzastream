"use client"
import { useParams } from "next/navigation"
import { AchievementBadge, type AchievementData } from "@/components/drops/achievement-card"
import { ArrowLeft, Users, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const MOCK: AchievementData = { id: "mwana-wa-angola", name: "Mwana wa Angola", description: "Assiste 10h de streams angolanos", emoji: "🇦🇴", unlocked: true, unlockedAt: new Date(Date.now() - 86400000).toISOString(), totalUnlocked: 2340 }

export default function ConquistaDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/conquistas/minhas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Conquista</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-4xl mx-auto">{MOCK.emoji}</div>
        <h2 className="text-xl font-black">{MOCK.name}</h2>
        <p className="text-xs text-muted-foreground">{MOCK.description}</p>
        {MOCK.unlocked && <Badge className="bg-green-500/10 text-green-400 text-[9px]">✅ Desbloqueado</Badge>}
      </div>
      {MOCK.unlocked && MOCK.unlockedAt && <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1"><Calendar className="w-3 h-3" />Desbloqueado em {new Date(MOCK.unlockedAt).toLocaleDateString("pt-AO")}</p>}
      {MOCK.totalUnlocked && <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1"><Users className="w-3 h-3" />{MOCK.totalUnlocked.toLocaleString()} utilizadores desbloquearam</p>}
      <div className="text-center"><AchievementBadge achievement={MOCK} /></div>
      <Button variant="outline" className="w-full gap-2 text-xs" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Desbloqueei a conquista "${MOCK.name}" no Kwanza Stream! 🏆`)}`, "_blank")}><MessageCircle className="w-4 h-4" />Partilhar no WhatsApp</Button>
    </div>
  )
}
