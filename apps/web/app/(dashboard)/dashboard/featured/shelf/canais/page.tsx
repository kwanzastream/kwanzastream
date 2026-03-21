"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedChannelRow, type FeaturedChannel } from "@/components/featured/featured-channel-row"
import { Search, Plus, Loader2, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function ShelfCanaisPage() {
  const [channels, setChannels] = useState<FeaturedChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<FeaturedChannel[]>([])
  const [searching, setSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => setChannels(res.data.shelf?.channels || []))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [])

  const save = async (next: FeaturedChannel[]) => {
    setSaving(true)
    try {
      await api.patch("/api/creator/featured/shelf", { channelIds: next.map(c => c.id) })
      toast.success("Shelf guardada")
    } catch {
      toast.error("Erro ao guardar")
    } finally {
      setSaving(false)
    }
  }

  const remove = (i: number) => {
    const next = channels.filter((_, idx) => idx !== i)
    setChannels(next)
    save(next)
  }

  const addChannel = (ch: FeaturedChannel) => {
    if (channels.length >= 6) { toast.error("Máximo de 6 canais na shelf"); return }
    if (channels.some(c => c.id === ch.id)) { toast.error("Canal já na shelf"); return }
    const next = [...channels, ch]
    setChannels(next)
    save(next)
    setShowSearch(false)
    setSearch("")
    setResults([])
  }

  const doSearch = async (q: string) => {
    setSearch(q)
    if (q.length < 2) { setResults([]); return }
    setSearching(true)
    try {
      const res = await api.get(`/api/search?q=${encodeURIComponent(q)}&type=users&limit=5`)
      setResults((res.data.users || res.data.results || []).map((u: any) => ({
        id: u.id, username: u.username, displayName: u.displayName, avatarUrl: u.avatarUrl, isLive: u.isLive,
      })))
    } catch { setResults([]) } finally { setSearching(false) }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/shelf" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Canais na Shelf ({channels.length}/6)</h2>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowSearch(!showSearch)} disabled={channels.length >= 6}>
          <Plus className="w-3.5 h-3.5" /> Adicionar
        </Button>
      </div>

      {showSearch && (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Pesquisar..." value={search} onChange={(e) => doSearch(e.target.value)} className="pl-9" autoFocus />
          </div>
          {searching && <div className="text-center py-2"><Loader2 className="w-4 h-4 animate-spin text-primary mx-auto" /></div>}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.filter(r => !channels.some(c => c.id === r.id)).map(r => (
                <button key={r.id} onClick={() => addChannel(r)} className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left">
                  <Avatar className="w-8 h-8"><AvatarImage src={r.avatarUrl || undefined} /><AvatarFallback className="bg-primary/20 text-primary text-xs">{r.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0"><p className="text-sm truncate">@{r.username}</p></div>
                  <Plus className="w-4 h-4 text-primary" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {channels.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
          <p className="text-sm text-muted-foreground">Shelf vazia. Adiciona até 6 canais.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {channels.map((ch, i) => (
            <FeaturedChannelRow key={ch.id} channel={ch} index={i} total={channels.length} onRemove={() => remove(i)} showReorder={false} />
          ))}
        </div>
      )}
    </div>
  )
}
