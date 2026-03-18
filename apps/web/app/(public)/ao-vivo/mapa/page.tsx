"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"

/* Mock live stream data per province.
   In production, fetch from /api/streams/by-province */
function useMockProvinceData() {
  return useMemo(() =>
    ANGOLA_PROVINCES.map((p) => {
      const streams = Math.max(0, Math.floor(Math.random() * 16) - 2)
      return {
        ...p,
        streams,
        viewers: streams > 0 ? Math.floor(Math.random() * 300) + 10 : 0,
        topStreamer: streams > 0 ? `${p.name.replace(/\s/g, "")}Streamer` : null,
      }
    }), [])
}

/* ----- scaled positions (0-450 x, 0-450 y viewport) ----- */
// Cabinda is a detached exclave in the north
const CABINDA_PATH = "M40,28 L65,28 L65,62 L40,62 Z"
// Angola mainland (simplified)
const MAINLAND_PATH = "M55,72 L160,68 L340,85 L420,135 L430,280 L400,420 L300,445 L130,440 L65,370 L50,280 L60,170 Z"

export default function AoVivoMapaPage() {
  const provinces = useMockProvinceData()
  const [selected, setSelected] = useState<string | null>(null)
  const selectedProvince = provinces.find((p) => p.slug === selected)
  const totalStreams = provinces.reduce((a, p) => a + p.streams, 0)
  const totalViewers = provinces.reduce((a, p) => a + p.viewers, 0)
  const ranked = [...provinces].sort((a, b) => b.streams - a.streams)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/ao-vivo" className="hover:text-foreground">Ao Vivo</Link>
          <span>/</span><span className="text-foreground">Mapa</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Streams por Localização 🗺️</h1>
        <p className="text-sm text-muted-foreground">Vê quem está ao vivo em cada uma das 21 províncias de Angola</p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-6 p-3 rounded-lg bg-[var(--surface-1)] border border-border/50">
        <span className="flex items-center gap-1.5 text-sm">
          <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />
          <strong>{totalStreams}</strong> streams ao vivo
        </span>
        <span className="text-border">·</span>
        <span className="flex items-center gap-1.5 text-sm">
          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
          <strong>{totalViewers}</strong> viewers
        </span>
        <span className="text-border">·</span>
        <span className="text-sm text-muted-foreground">21 províncias</span>
      </div>

      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        {/* ===== MAP ===== */}
        <div className="relative aspect-[4/3] bg-[var(--surface-1)] rounded-2xl border border-border/50 overflow-hidden">
          <div className="absolute inset-0 p-4 md:p-6">
            <svg viewBox="0 0 460 460" className="w-full h-full" role="img" aria-label="Mapa das 21 províncias de Angola com streams ao vivo">
              {/* Cabinda exclave */}
              <path d={CABINDA_PATH} fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1" rx="2" />
              <text x="52" y="22" textAnchor="middle" fill="var(--muted-foreground)" fontSize="7" fontWeight="600">Cabinda</text>
              {/* Exclave label line */}
              <line x1="52" y1="62" x2="52" y2="70" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2" />

              {/* Angola mainland */}
              <path d={MAINLAND_PATH} fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1" />

              {/* Province internal borders (simplified) */}
              {/* Horizontal-ish divisions */}
              <line x1="55"  y1="120" x2="340" y2="105" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="60"  y1="180" x2="430" y2="170" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="55"  y1="240" x2="430" y2="235" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="60"  y1="310" x2="430" y2="305" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="65"  y1="380" x2="400" y2="375" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              {/* Vertical-ish divisions */}
              <line x1="110" y1="72"  x2="100" y2="440" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="175" y1="72"  x2="170" y2="440" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="260" y1="85"  x2="255" y2="445" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
              <line x1="350" y1="100" x2="345" y2="430" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />

              {/* Province dots */}
              {provinces.map((province) => {
                const intensity = province.streams > 10 ? 1 : province.streams > 5 ? 0.7 : province.streams > 2 ? 0.5 : province.streams > 0 ? 0.3 : 0.1
                const dotR = province.streams > 10 ? 8 : province.streams > 5 ? 7 : province.streams > 0 ? 5.5 : 4
                const isSmall = province.slug === "luanda" || province.slug === "icolo-e-bengo"
                const isSelected = selected === province.slug

                return (
                  <g
                    key={province.slug}
                    className="cursor-pointer"
                    onClick={() => setSelected(province.slug)}
                    role="button"
                    aria-label={`${province.name}: ${province.streams} streams, ${province.viewers} viewers`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(province.slug)}
                  >
                    {/* Heatmap glow */}
                    {province.streams > 0 && (
                      <circle
                        cx={province.cx} cy={province.cy} r={dotR * 2.5}
                        fill={`rgba(206, 17, 38, ${intensity * 0.15})`}
                        className="animate-pulse"
                      />
                    )}
                    {/* Dot */}
                    <circle
                      cx={province.cx} cy={province.cy} r={dotR}
                      fill={province.streams > 0 ? `rgba(206, 17, 38, ${intensity})` : "var(--surface-4)"}
                      stroke={isSelected ? "white" : "transparent"}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                    {/* Stream count in dot */}
                    {province.streams > 0 && dotR >= 5.5 && (
                      <text x={province.cx} y={province.cy + 1.5} textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" pointerEvents="none">
                        {province.streams}
                      </text>
                    )}
                    {/* Label — small provinces get a tooltip line instead */}
                    {isSmall ? (
                      <>
                        <line x1={province.cx} y1={province.cy - dotR - 2} x2={province.cx + 20} y2={province.cy - dotR - 14} stroke="var(--muted-foreground)" strokeWidth="0.5" />
                        <text x={province.cx + 22} y={province.cy - dotR - 12} fill="var(--muted-foreground)" fontSize="5.5" fontWeight={isSelected ? "bold" : "normal"}>
                          {province.name}
                        </text>
                      </>
                    ) : (
                      <text
                        x={province.cx} y={province.cy - dotR - 4}
                        textAnchor="middle"
                        fill={isSelected ? "var(--foreground)" : "var(--muted-foreground)"}
                        fontSize="6"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {province.name}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Luanda special highlight (star marker) */}
              <circle cx={72} cy={160} r={12} fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3" opacity="0.4" />
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] text-muted-foreground bg-background/80 backdrop-blur rounded-lg px-2 py-1 border border-border/30">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#CE1126]" />10+ streams</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#CE1126]/50" />1–9 streams</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--surface-4)]" />0 streams</span>
          </div>
        </div>

        {/* ===== SIDEBAR ===== */}
        <div className="space-y-4">
          {/* Selected province detail */}
          {selectedProvince && (
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-bold">{selectedProvince.name}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capital</span>
                  <span className="font-medium">{selectedProvince.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Streams ao vivo</span>
                  <span className="font-medium">{selectedProvince.streams}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viewers</span>
                  <span className="font-medium">{selectedProvince.viewers}</span>
                </div>
                {selectedProvince.topStreamer && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Em destaque</span>
                    <Link href={`/${selectedProvince.topStreamer}`} className="text-primary font-medium hover:underline">
                      @{selectedProvince.topStreamer}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedProvince && (
            <div className="p-4 rounded-xl border border-border/50 bg-card text-center text-sm text-muted-foreground">
              <MapPin className="w-5 h-5 mx-auto mb-2 text-muted-foreground/50" />
              Clica numa província para ver detalhes
            </div>
          )}

          {/* Province ranking */}
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <h3 className="font-bold text-sm mb-3">Ranking de Províncias 🏆</h3>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
              {ranked.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setSelected(p.slug)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors ${selected === p.slug ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"}`}
                >
                  <span className="w-6 text-xs text-muted-foreground font-medium text-center">#{i + 1}</span>
                  <span className="flex-1 truncate text-xs">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground">{p.streams} 📡</span>
                  <span className="text-[10px] text-muted-foreground">{p.viewers} <Eye className="w-2.5 h-2.5 inline" /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
