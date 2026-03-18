"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, MessageSquarePlus, AlertTriangle, Loader2 } from "lucide-react"
import { DM_LIMITS } from "@/lib/dm-limits"
import { toast } from "sonner"
import Link from "next/link"

interface UserResult { id: string; username: string; displayName: string; avatarUrl?: string; isOnline?: boolean; dmEnabled?: boolean; accountAge?: number }

// Mock users
const MOCK_USERS: UserResult[] = [
  { id: "u1", username: "angolangamer", displayName: "Angola Gamer", isOnline: true, dmEnabled: true, accountAge: 90 * 24 * 3600000 },
  { id: "u2", username: "kuduroking", displayName: "Kuduro King", isOnline: false, dmEnabled: true, accountAge: 180 * 24 * 3600000 },
  { id: "u3", username: "mc_angolano", displayName: "MC Angolano", isOnline: true, dmEnabled: false, accountAge: 365 * 24 * 3600000 },
  { id: "u4", username: "new_user", displayName: "Novo Utilizador", isOnline: true, dmEnabled: true, accountAge: 12 * 3600000 },
]

export default function MensagensNovaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toUsername = searchParams.get("to")
  const [search, setSearch] = useState(toUsername || "")
  const [results, setResults] = useState<UserResult[]>([])
  const [loading, setLoading] = useState(false)

  // Auto-search if ?to= query param present (correction #1)
  useEffect(() => {
    if (toUsername) { setSearch(toUsername); handleSearch(toUsername) }
  }, [toUsername])

  const handleSearch = async (query?: string) => {
    const q = query || search
    if (!q.trim()) return
    setLoading(true)
    try {
      const res = await api.get(`/api/users/search?q=${encodeURIComponent(q)}`)
      setResults(res.data?.users || MOCK_USERS.filter(u => u.username.includes(q.toLowerCase()) || u.displayName.toLowerCase().includes(q.toLowerCase())))
    } catch {
      setResults(MOCK_USERS.filter(u => u.username.includes(q.toLowerCase()) || u.displayName.toLowerCase().includes(q.toLowerCase())))
    } finally { setLoading(false) }
  }

  const handleSelectUser = async (user: UserResult) => {
    // Check DM permission (client-side UX, server validates too — correction #4)
    if (!user.dmEnabled) { toast.error(`@${user.username} tem mensagens desactivadas`); return }
    if (user.accountAge && user.accountAge < DM_LIMITS.minAccountAge) { toast.warning("Conta muito nova — limites anti-spam aplicados"); }

    // Resolve or create conversation → redirect to /mensagens/:id
    try {
      const res = await api.post("/api/messages/conversations", { participantId: user.id })
      router.push(`/mensagens/${res.data?.conversationId || res.data?.id || user.id}`)
    } catch {
      router.push(`/mensagens/${user.id}`)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push("/mensagens")}><ArrowLeft className="w-4 h-4" /></Button>
        <h1 className="text-xl font-bold">Nova mensagem</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch() }} className="flex gap-2">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Pesquisar por username..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus /></div>
        <Button type="submit" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pesquisar"}</Button>
      </form>

      {/* Results */}
      <div className="space-y-2">
        {results.map(u => (
          <button key={u.id} onClick={() => handleSelectUser(u)} className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <div className="relative shrink-0">
              <Avatar className="w-10 h-10"><AvatarImage src={u.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary text-xs">{u.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
              {u.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{u.displayName}</p>
              <p className="text-[10px] text-muted-foreground">@{u.username}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {!u.dmEnabled && <Badge variant="outline" className="text-[9px] text-amber-400 border-amber-400/30"><AlertTriangle className="w-2.5 h-2.5 mr-0.5" />DMs off</Badge>}
              {u.accountAge && u.accountAge < DM_LIMITS.minAccountAge && <Badge variant="outline" className="text-[9px] text-amber-400 border-amber-400/30">Conta nova</Badge>}
              <MessageSquarePlus className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        ))}
        {results.length === 0 && search && !loading && <p className="text-sm text-muted-foreground text-center py-8">Nenhum utilizador encontrado</p>}
      </div>

      {/* Suggestions when no search */}
      {!search && results.length === 0 && (
        <div className="text-center py-8"><MessageSquarePlus className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Pesquisa um username para começar</p></div>
      )}
    </div>
  )
}
