"use client"
import { useRouter } from "next/navigation"
import { ClearHistoryModal } from "@/components/history/clear-history-modal"
import Link from "next/link"
export default function LimparPage() {
  const router = useRouter()
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">🗑️ Limpar histórico</h1>
      <p className="text-xs text-muted-foreground">O que queres limpar?</p>
      <div className="space-y-2">
        <Link href="/historico/limpar/tudo" className="block p-3 rounded-xl border border-white/10 hover:border-red-500/30 transition-colors"><p className="text-xs font-semibold">Tudo</p><p className="text-[10px] text-muted-foreground">Streams, pesquisas, canais visitados, progresso de VODs</p></Link>
        <Link href="/historico/limpar/streams" className="block p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors"><p className="text-xs font-semibold">Só streams e VODs</p><p className="text-[10px] text-muted-foreground">Mantém pesquisas e canais visitados</p></Link>
        <Link href="/historico/limpar/pesquisas" className="block p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors"><p className="text-xs font-semibold">Só pesquisas</p><p className="text-[10px] text-muted-foreground">Mantém streams e canais visitados</p></Link>
      </div>
      <button onClick={() => router.back()} className="w-full text-center text-[10px] text-muted-foreground hover:text-foreground">← Voltar</button>
    </div>
  )
}
