"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, X, Clock, TrendingUp, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchBarProps {
  initialQuery?: string
  onSearch?: (q: string) => void
  autoFocus?: boolean
  showSuggestions?: boolean
  className?: string
}

const TRENDING = ["kuduro ao vivo", "gaming angola", "valorant", "fifa", "culinária angolana", "girabola"]

export function SearchBar({ initialQuery = "", onSearch, autoFocus = true, showSuggestions = true, className = "" }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<{ type: "history" | "trending"; text: string }[]>([])
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!debouncedQuery.trim() || !showSuggestions) {
      setSuggestions(TRENDING.slice(0, 6).map(t => ({ type: "trending", text: t })))
      return
    }
    // Mock: filter trending + simulate history
    const matches = TRENDING.filter(t => t.includes(debouncedQuery.toLowerCase())).map(t => ({ type: "trending" as const, text: t }))
    setSuggestions(matches.slice(0, 8))
  }, [debouncedQuery, showSuggestions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setFocused(false)
    if (onSearch) onSearch(query.trim())
    else router.push(`/pesquisa/tudo?q=${encodeURIComponent(query.trim())}`)
  }

  const handleSelect = (text: string) => {
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

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input ref={inputRef} placeholder="Pesquisar streams, canais, categorias..." className="pl-11 pr-10 h-12 text-base"
          value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setFocused(true)} autoFocus={autoFocus} />
        {query && <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus() }} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-muted-foreground" /></button>}
      </form>

      {/* Suggestions dropdown */}
      {focused && showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-popover border border-white/10 rounded-xl shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleSelect(s.text)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-muted/40 transition-colors">
              {s.type === "history" ? <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <TrendingUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
              <span>{s.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {focused && <div className="fixed inset-0 z-40" onClick={() => setFocused(false)} />}
    </div>
  )
}
