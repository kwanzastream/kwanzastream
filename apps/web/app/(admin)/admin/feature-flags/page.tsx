"use client"
import { useState, useEffect } from "react"
import { FeatureFlagRow } from "@/components/admin/feature-flag-row"
import api from "@/lib/api"
import { toast } from "sonner"
export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<any[]>([])
  useEffect(() => { api.get("/api/admin/feature-flags").then(r => setFlags(r.data || [])).catch(() => setFlags([
    { name: "SHORTS_FEED", enabled: true, rollout: 100, description: "Feed de shorts" },
    { name: "RADIO_MODE", enabled: true, rollout: 100, description: "Modo rádio" },
    { name: "LIVE_ADS", enabled: false, rollout: 0, description: "Ads ao vivo" },
    { name: "KWANZA_AWARDS_VOTE", enabled: false, rollout: 0, description: "Votação Awards Nov 2026" },
    { name: "DISCORD_INTEGRATION", enabled: true, rollout: 10, description: "Rollout gradual" },
  ])) }, [])
  const toggle = async (name: string) => { try { await api.patch(`/api/admin/feature-flags/${name}/toggle`); setFlags(prev => prev.map(f => f.name === name ? { ...f, enabled: !f.enabled } : f)); toast.success(`${name} toggled`) } catch { toast.error("Erro") } }
  return (<div className="space-y-4"><h1 className="text-xl font-bold">🏳 Feature Flags</h1><p className="text-xs text-muted-foreground">Só super_admin (@kwanzastream)</p>
    <div className="space-y-2">{flags.map(f => <FeatureFlagRow key={f.name} {...f} onToggle={() => toggle(f.name)} />)}</div></div>)
}
