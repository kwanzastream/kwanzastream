"use client"
import { SmQuickActionButton } from "@/components/stream-manager/sm-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function QuickActionsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Acções Rápidas</h1></div>
      <div className="grid grid-cols-3 gap-2">
        <Link href="/dashboard/stream-manager/polls"><SmQuickActionButton icon="📊" label="Criar Poll" /></Link>
        <Link href="/dashboard/stream-manager/predictions"><SmQuickActionButton icon="🎲" label="Prediction" /></Link>
        <Link href="/dashboard/stream-manager/raid"><SmQuickActionButton icon="⚔️" label="Iniciar Raid" /></Link>
        <Link href="/dashboard/stream-manager/hype-train"><SmQuickActionButton icon="🚂" label="Hype Train" /></Link>
        <Link href="/dashboard/stream-manager/marcadores"><SmQuickActionButton icon="📌" label="Marcador" /></Link>
        <Link href="/dashboard/stream-manager/clip-rapido"><SmQuickActionButton icon="✂️" label="Clip Rápido" /></Link>
        <SmQuickActionButton icon="⏸" label="Slow Mode" onClick={() => toast.success("Slow mode activado")} />
        <SmQuickActionButton icon="👥" label="Só Seguidores" onClick={() => toast.success("Modo seguidores")} />
        <SmQuickActionButton icon="🔇" label="Chat Off" onClick={() => toast.success("Chat desligado")} variant="danger" />
        <SmQuickActionButton icon="🔔" label="Shoutout" onClick={() => toast.info("Menciona @username no chat")} />
        <Link href="/dashboard/stream-manager/info-stream"><SmQuickActionButton icon="📋" label="Mudar Título" /></Link>
        <Link href="/dashboard/stream-manager/info-stream"><SmQuickActionButton icon="🎭" label="Mudar Cat." /></Link>
      </div>
    </div>
  )
}
