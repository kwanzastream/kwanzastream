"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchHistoryItem } from "@/components/search/search-history-item"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Trash2 } from "lucide-react"
import Link from "next/link"

const MOCK = [
  { query: "angolangamer", date: "há 2h" },
  { query: "kuduro streams", date: "há 5h" },
  { query: "valorant angola", date: "ontem" },
  { query: "gaming setup luanda", date: "há 2 dias" },
  { query: "culinária angolana receitas", date: "há 3 dias" },
  { query: "girabola ao vivo", date: "há 1 semana" },
  { query: "mc angolano", date: "há 1 semana" },
  { query: "fifa torneio", date: "há 2 semanas" },
]

export default function PesquisaHistoricoPage() {
  const router = useRouter()
  const [history, setHistory] = useState(MOCK)

  const handleClear = () => setHistory([])

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><Link href="/pesquisa"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Histórico</h1></div>
        {history.length > 0 && <Button variant="ghost" size="sm" className="text-xs text-destructive gap-1" onClick={handleClear}><Trash2 className="w-3 h-3" />Limpar tudo</Button>}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16"><Clock className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem pesquisas recentes</p></div>
      ) : (
        <div className="space-y-1">
          {history.map((h, i) => (
            <SearchHistoryItem key={i} query={h.query} date={h.date}
              onRepeat={() => router.push(`/pesquisa/tudo?q=${encodeURIComponent(h.query)}`)}
              onRemove={() => setHistory(prev => prev.filter((_, j) => j !== i))} />
          ))}
        </div>
      )}
    </div>
  )
}
