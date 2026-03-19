"use client"
import { useParams } from "next/navigation"
import { TournamentBracket, MOCK_BRACKET } from "@/components/tournaments/tournament-bracket"
import { ArrowLeft, Settings, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

export default function TorneioAdminBracketPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/admin`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Settings className="w-5 h-5" />Gerar/Editar Bracket</h1></div>
      <div className="flex gap-2"><Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => toast.success("Bracket gerado!")}><RefreshCw className="w-3 h-3" />Gerar bracket</Button><Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success("Seeds actualizados!")}>Actualizar seeds</Button></div>
      <TournamentBracket matches={MOCK_BRACKET} rounds={3} />
    </div>
  )
}
