"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, X } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
}

interface ContentFiltersProps {
  categories?: FilterOption[]
  languages?: FilterOption[]
  durations?: FilterOption[]
  sortOptions?: FilterOption[]
  onFilterChange?: (filters: Record<string, string>) => void
  activeFilters?: Record<string, string>
  showLiveToggle?: boolean
}

const DEFAULT_SORT_OPTIONS: FilterOption[] = [
  { value: "relevance", label: "Relevância" },
  { value: "recent", label: "Recente" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "Novo" },
]

const DEFAULT_LANGUAGES: FilterOption[] = [
  { value: "", label: "Todos os idiomas" },
  { value: "pt-ao", label: "Português (AO)" },
  { value: "pt-br", label: "Português (BR)" },
  { value: "en", label: "Inglês" },
  { value: "fr", label: "Francês" },
  { value: "kimbundu", label: "Kimbundu" },
  { value: "umbundu", label: "Umbundu" },
]

const DEFAULT_DURATIONS: FilterOption[] = [
  { value: "", label: "Qualquer duração" },
  { value: "short", label: "< 30 min" },
  { value: "medium", label: "30–120 min" },
  { value: "long", label: "> 2 horas" },
]

export function ContentFilters({ categories, languages, durations, sortOptions, onFilterChange, activeFilters = {}, showLiveToggle }: ContentFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>(activeFilters)

  const updateFilter = (key: string, value: string) => {
    const next = { ...filters, [key]: value }
    if (!value) delete next[key]
    setFilters(next)
    onFilterChange?.(next)
  }

  const clearAll = () => {
    setFilters({})
    onFilterChange?.({})
  }

  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="w-3.5 h-3.5" />Filtros
          {activeCount > 0 && <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[9px]">{activeCount}</Badge>}
        </Button>

        {/* Sort */}
        <Select value={filters.sort || "relevance"} onValueChange={(v) => updateFilter("sort", v)}>
          <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {(sortOptions || DEFAULT_SORT_OPTIONS).map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showLiveToggle && (
          <button
            onClick={() => updateFilter("live", filters.live === "true" ? "" : "true")}
            className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${filters.live === "true" ? "border-[#CE1126] bg-[#CE1126]/10 text-[#CE1126]" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full" />Ao vivo</span>
          </button>
        )}

        {/* Active filter chips */}
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="w-3 h-3" />Limpar
          </button>
        )}
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-[var(--surface-1)] border border-border/50 animate-fade-in">
          {categories && categories.length > 0 && (
            <Select value={filters.category || ""} onValueChange={(v) => updateFilter("category", v)}>
              <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue placeholder="Categoria" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="" className="text-xs">Todas as categorias</SelectItem>
                {categories.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={filters.language || ""} onValueChange={(v) => updateFilter("language", v)}>
            <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue placeholder="Idioma" /></SelectTrigger>
            <SelectContent>
              {(languages || DEFAULT_LANGUAGES).map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(durations || DEFAULT_DURATIONS).length > 0 && (
            <Select value={filters.duration || ""} onValueChange={(v) => updateFilter("duration", v)}>
              <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue placeholder="Duração" /></SelectTrigger>
              <SelectContent>
                {(durations || DEFAULT_DURATIONS).map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  )
}

/* ============ TAB PILLS ============ */
interface TabPillsProps {
  tabs: { value: string; label: string; href?: string }[]
  activeTab: string
  onTabChange?: (tab: string) => void
}

export function TabPills({ tabs, activeTab, onTabChange }: TabPillsProps) {
  return (
    <div className="scroll-tabs gap-2 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange?.(tab.value)}
          className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors border ${activeTab === tab.value ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/* ============ PERIOD SELECTOR ============ */
interface PeriodSelectorProps {
  periods: { value: string; label: string }[]
  activePeriod: string
  onPeriodChange: (period: string) => void
}

export function PeriodSelector({ periods, activePeriod, onPeriodChange }: PeriodSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-[var(--surface-1)] rounded-lg p-0.5 border border-border/50">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onPeriodChange(p.value)}
          className={`px-3 py-1 rounded-md text-xs transition-colors ${activePeriod === p.value ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
