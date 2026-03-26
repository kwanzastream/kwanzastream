"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Clock, TrendingUp, Loader2, Users, Radio } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { api } from "@/lib/api"

interface SearchBarProps {
  initialQuery?: string
  onSearch?: (q: string) => void
  autoFocus?: boolean
  showSuggestions?: boolean
  className?: string
}

interface SuggestionUser {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  isVerified: boolean
  followersCount: number
}

interface SuggestionStream {
  id: string
  title: string
  category: string
  viewerCount: number
  streamer: { username: string; displayName: string; avatarUrl?: string }
}

export function SearchBar({ initialQuery = "", onSearch, autoFocus = true, showSuggestions = true, className = "" }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<SuggestionUser[]>([])
  const [streams, setStreams] = useState<SuggestionStream[]>([])
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch real suggestions from API
  useEffect(() => {
    if (!debouncedQuery.trim() || !showSuggestions || debouncedQuery.trim().length < 2) {
      setUsers([])
      setStreams([])
      return
    }

    setLoading(true)
    api.get(`/api/search?q=${encodeURIComponent(debouncedQuery.trim())}&type=all&limit=5`)
      .then((res) => {
        setUsers(res.data.users || [])
        setStreams(res.data.streams || [])
      })
      .catch(() => {
        setUsers([])
        setStreams([])
      })
      .finally(() => setLoading(false))
  }, [debouncedQuery, showSuggestions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setFocused(false)
    if (onSearch) onSearch(query.trim())
    else router.push(`/pesquisa/tudo?q=${encodeURIComponent(query.trim())}`)
  }

  const handleSelectUser = (username: string) => {
    setFocused(false)
    router.push(`/${username}`)
  }

  const handleSelectStream = (username: string) => {
    setFocused(false)
    router.push(`/stream/${username}`)
  }

  const handleSelectQuery = (text: string) => {
    setQuery(text)
    setFocused(false)
    if (onSearch) onSearch(text)
    else router.push(`/pesquisa/tudo?q=${encodeURIComponent(text)}`)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") { setFocused(false); inputRef.current?.blur() } }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const hasSuggestions = users.length > 0 || streams.length > 0

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input ref={inputRef} placeholder="Pesquisar streams, canais, jogos..." className="pl-11 pr-10 h-12 text-base"
          value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setFocused(true)} autoFocus={autoFocus} />
        {query && <button type="button" onClick={() => { setQuery(""); setUsers([]); setStreams([]); inputRef.current?.focus() }} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-muted-foreground" /></button>}
      </form>

      {/* Suggestions dropdown */}
      {focused && showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-popover border border-white/10 rounded-xl shadow-xl z-50 py-1 max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-2">A procurar...</span>
            </div>
          )}

          {!loading && !hasSuggestions && debouncedQuery.trim().length >= 2 && (
            <div className="px-4 py-4 text-center text-sm text-muted-foreground">
              Nenhum resultado para &quot;{debouncedQuery}&quot;
            </div>
          )}

          {!loading && !hasSuggestions && debouncedQuery.trim().length < 2 && (
            <div className="px-4 py-3 text-xs text-muted-foreground">
              Escreve pelo menos 2 caracteres para pesquisar
            </div>
          )}

          {/* Live streams */}
          {streams.length > 0 && (
            <>
              <div className="px-4 py-1.5 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-[#CE1126]" /> Ao Vivo
              </div>
              {streams.map(s => (
                <button key={s.id} onClick={() => handleSelectStream(s.streamer.username)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-muted/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#CE1126]/10 flex items-center justify-center shrink-0">
                    <Radio className="w-3.5 h-3.5 text-[#CE1126]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground">{s.streamer.displayName} · {s.category}</p>
                  </div>
                  <span className="text-[10px] text-[#CE1126] font-bold">{s.viewerCount} 👁</span>
                </button>
              ))}
            </>
          )}

          {/* Channels */}
          {users.length > 0 && (
            <>
              <div className="px-4 py-1.5 text-[10px] font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Canais
              </div>
              {users.map(u => (
                <button key={u.id} onClick={() => handleSelectUser(u.username!)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-muted/40 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={u.avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                      {(u.displayName || u.username || '?').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium truncate">{u.displayName}</span>
                      {u.isVerified && <span className="text-primary text-xs">✓</span>}
                    </div>
                    <p className="text-[10px] text-muted-foreground">@{u.username} · {u.followersCount} seguidores</p>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* Search button */}
          {debouncedQuery.trim() && (
            <button onClick={() => handleSelectQuery(debouncedQuery.trim())}
              className="w-full flex items-center gap-2 px-4 py-2.5 border-t border-white/5 text-sm text-primary hover:bg-muted/40 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Ver todos os resultados para &quot;{debouncedQuery.trim()}&quot;</span>
            </button>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {focused && <div className="fixed inset-0 z-40" onClick={() => setFocused(false)} />}
    </div>
  )
}
