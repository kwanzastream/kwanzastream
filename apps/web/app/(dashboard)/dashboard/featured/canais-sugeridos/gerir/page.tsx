"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeaturedChannelRow, type FeaturedChannel } from "@/components/featured/featured-channel-row"
import { Search, Plus, Loader2, AlertCircle, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function GerirCanaisSugeridosPage() {
  const [channels, setChannels] = useState<FeaturedChannel[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<FeaturedChannel[]>([])
  const [searching, setSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    api.get("/api/creator/featured")
      .then(res => setChannels(res.data.suggestedChannels?.channels || []))
      .catch(() => toast.error("Erro ao carregar"))
      .finally(() => setLoading(false))
  }, [])

  const save = async (newChannels: FeaturedChannel[]) => {
    setSaving(true)
    try {
      await api.patch("/api/creator/featured/suggested-channels", {
        channelIds: newChannels.map(c => c.id),
      })
      toast.success("Canais guardados")
    } catch {
      toast.error("Erro ao guardar")
    } finally {
      setSaving(false)
    }
  }

  const moveUp = (i: number) => {
    if (i === 0) return
    const next = [...channels]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    setChannels(next)
    save(next)
  }

  const moveDown = (i: number) => {
    if (i === channels.length - 1) return
    const next = [...channels]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    setChannels(next)
    save(next)
  }

  const remove = (i: number) => {
    const next = channels.filter((_, idx) => idx !== i)
    setChannels(next)
    save(next)
  }

  const addChannel = (ch: FeaturedChannel) => {
    if (channels.length >= 10) {
      toast.error("Máximo de 10 canais atingido")
      return
    }
    if (channels.some(c => c.id === ch.id)) {
      toast.error("Canal já adicionado")
      return
    }
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
        id: u.id,
        username: u.username,
        displayName: u.displayName,
        avatarUrl: u.avatarUrl,
        isLive: u.isLive,
      })))
    } catch {
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/canais-sugeridos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Gerir Canais Sugeridos ({channels.length}/10)</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setShowSearch(!showSearch)}
          disabled={channels.length >= 10}
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar canal
        </Button>
      </div>

      {/* Search panel */}
      {showSearch && (
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar canais..."
              value={search}
              onChange={(e) => doSearch(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>
          {searching && <div className="text-center py-2"><Loader2 className="w-4 h-4 animate-spin text-primary mx-auto" /></div>}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.filter(r => !channels.some(c => c.id === r.id)).map(r => (
                <button
                  key={r.id}
                  onClick={() => addChannel(r)}
                  className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={r.avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">{r.displayName?.slice(0, 2) || "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">@{r.username}</p>
                    <p className="text-[10px] text-muted-foreground">{r.displayName}</p>
                  </div>
                  <Plus className="w-4 h-4 text-primary" />
                </button>
              ))}
            </div>
          )}
          {search.length >= 2 && !searching && results.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">Nenhum resultado</p>
          )}
        </div>
      )}

      {/* Channel list */}
      {channels.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center">
          <AlertCircle className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Nenhum canal adicionado.</p>
          <p className="text-[10px] text-muted-foreground">Clica em "Adicionar canal" para pesquisar e seleccionar.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {channels.map((ch, i) => (
            <FeaturedChannelRow
              key={ch.id}
              channel={ch}
              index={i}
              total={channels.length}
              onMoveUp={() => moveUp(i)}
              onMoveDown={() => moveDown(i)}
              onRemove={() => remove(i)}
              showReorder
            />
          ))}
        </div>
      )}

      {saving && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" /> A guardar...
        </div>
      )}
    </div>
  )
}
