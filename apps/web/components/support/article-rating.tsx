"use client"
import { useState } from "react"
import api from "@/lib/api"
import { toast } from "sonner"
interface ArticleRatingProps { slug: string }
export function ArticleRating({ slug }: ArticleRatingProps) {
  const [rated, setRated] = useState(false)
  const rate = async (helpful: boolean) => {
    try { await api.post(`/api/support/articles/${slug}/rate`, { helpful }); setRated(true); toast.success("Obrigado pelo feedback!") } catch { setRated(true) }
  }
  if (rated) return <p className="text-[10px] text-muted-foreground text-center py-2">✅ Obrigado pelo feedback!</p>
  return (
    <div className="text-center py-3 border-t border-white/5"><p className="text-xs text-muted-foreground mb-2">Este artigo foi útil?</p>
      <div className="flex items-center justify-center gap-3"><button onClick={() => rate(true)} className="px-3 py-1 rounded-lg border border-white/10 text-xs hover:bg-white/5">✅ Sim</button><button onClick={() => rate(false)} className="px-3 py-1 rounded-lg border border-white/10 text-xs hover:bg-white/5">❌ Não</button></div>
    </div>
  )
}
