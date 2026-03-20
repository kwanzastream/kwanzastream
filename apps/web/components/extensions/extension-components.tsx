"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ExtensionCard({ icon, name, desc, author, installed }: { icon: string; name: string; desc: string; author: string; installed?: boolean }) {
  return (
    <div className="p-3 rounded-xl border border-white/10 hover:border-primary/20">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold">{name}</p>
          <p className="text-[8px] text-muted-foreground">{desc}</p>
          <p className="text-[8px] text-muted-foreground mt-0.5">{author} · Gratuito</p>
        </div>
        <Button size="sm" variant={installed ? "outline" : "default"} className="text-[8px] h-6 shrink-0" onClick={() => toast.success(installed ? "A configurar..." : "Instalada!")}>{installed ? "Configurar" : "Instalar"}</Button>
      </div>
    </div>
  )
}

export function InstalledExtensionRow({ icon, name, position, active, onToggle }: { icon: string; name: string; position?: string; active: boolean; onToggle?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10">
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold">{name}</p>
        <p className="text-[8px] text-muted-foreground">{active ? `● Activa em: ${position}` : "○ Inactiva"}</p>
      </div>
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="text-[8px] h-6" onClick={onToggle}>{active ? "Desactivar" : "Activar"}</Button>
        <Button size="sm" variant="outline" className="text-[8px] h-6 text-red-400" onClick={() => toast.info("Desinstalada")}>×</Button>
      </div>
    </div>
  )
}

export function PositionSlot({ label, extension, empty }: { label: string; extension?: string; empty?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border ${empty ? "border-dashed border-white/20" : "border-primary/20 bg-primary/5"}`}>
      <p className="text-[8px] text-muted-foreground uppercase">{label}</p>
      {extension ? <p className="text-xs font-bold mt-0.5">{extension}</p> : <p className="text-[9px] text-muted-foreground mt-0.5">Slot vazio — arrasta uma extensão</p>}
    </div>
  )
}
