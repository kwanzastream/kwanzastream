"use client"

interface SearchFiltersProps {
  filters: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function SearchFilters({ filters, active, onChange, className = "" }: SearchFiltersProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide pb-1 ${className}`}>
      {filters.map(f => (
        <button key={f.id} onClick={() => onChange(f.id)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${active === f.id ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground hover:text-foreground"}`}>
          {f.label}
        </button>
      ))}
    </div>
  )
}
