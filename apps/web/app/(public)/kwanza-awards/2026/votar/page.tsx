"use client"
import { useState, useEffect } from "react"
import { AwardsNomineeCard } from "@/components/angola/awards-nominee-card"
import api from "@/lib/api"
import { toast } from "sonner"
export default function VotarPage() {
  const [nominees, setNominees] = useState<any[]>([])
  const [voted, setVoted] = useState<string[]>([])
  useEffect(() => { api.get("/api/awards/2026/nominees").then(r => setNominees(r.data || [])).catch(() => {}) }, [])
  const handleVote = async (category: string, nomineeId: string) => {
    try { await api.post("/api/awards/2026/vote", { category, nomineeId }); setVoted(v => [...v, category]); toast.success("Voto registado!") }
    catch (e: any) { toast.error(e?.response?.data?.error || "Erro ao votar — inicia sessão") }
  }
  const grouped = nominees.reduce((acc: Record<string, any[]>, n) => { (acc[n.category] = acc[n.category] || []).push(n); return acc }, {})
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">Votar 2026</h1>
    <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">📅 Votação abre 1 Novembro 2026. Login obrigatório. 1 voto por categoria.</div>
    {Object.entries(grouped).map(([cat, noms]) => (
      <div key={cat} className="space-y-2"><h2 className="text-sm font-semibold capitalize">{cat}</h2>{(noms as any[]).map((n: any) =>
        <AwardsNomineeCard key={n.id} {...n} voted={voted.includes(cat)} onVote={() => handleVote(cat, n.id)} />
      )}</div>
    ))}
  </div>)
}
