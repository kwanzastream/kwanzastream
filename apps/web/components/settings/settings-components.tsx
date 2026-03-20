"use client"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function SettingsSection({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div><h2 className="text-sm font-bold">{title}</h2>{desc && <p className="text-[9px] text-muted-foreground">{desc}</p>}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

export function SettingsRow({ label, desc, href, value, children }: { label: string; desc?: string; href?: string; value?: string; children?: React.ReactNode }) {
  const inner = (
    <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
      <div><p className="text-xs font-bold">{label}</p>{desc && <p className="text-[8px] text-muted-foreground">{desc}</p>}</div>
      <div className="flex items-center gap-2">{value && <span className="text-[10px] text-muted-foreground">{value}</span>}{children}{href && <ChevronRight className="w-3 h-3 text-muted-foreground" />}</div>
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}

export function SettingsSaveBar({ dirty, onSave, saving }: { dirty: boolean; onSave: () => void; saving?: boolean }) {
  if (!dirty) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 border-t border-white/10 backdrop-blur-lg z-50 flex items-center justify-center gap-3">
      <p className="text-xs text-muted-foreground">Tens alterações por guardar</p>
      <button onClick={onSave} disabled={saving} className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold disabled:opacity-50">{saving ? "A guardar..." : "Guardar"}</button>
    </div>
  )
}

export function DangerZone({ children }: { children: React.ReactNode }) {
  return <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-3">{children}</div>
}
