"use client"

import { Users, MapPin, Tag, Heart } from "lucide-react"

interface AudienceTargetingCardProps {
  totalReach: number
  provinces: string[]
  categories: string[]
  interests: string[]
}

export function AudienceTargetingCard({ totalReach, provinces, categories, interests }: AudienceTargetingCardProps) {
  const activeFilters = provinces.length + categories.length + interests.length

  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Alcance estimado</span>
        </div>
        <span className="text-lg font-bold text-primary">{(totalReach / 1000).toFixed(1)}k</span>
      </div>

      {activeFilters > 0 && (
        <div className="space-y-1.5">
          {provinces.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <MapPin className="w-3 h-3" /> {provinces.join(", ")}
            </div>
          )}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Tag className="w-3 h-3" /> {categories.join(", ")}
            </div>
          )}
          {interests.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Heart className="w-3 h-3" /> {interests.join(", ")}
            </div>
          )}
        </div>
      )}

      {activeFilters === 0 && <p className="text-[10px] text-muted-foreground">Sem filtros — alcança toda a audiência</p>}
    </div>
  )
}
