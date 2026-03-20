"use client"
import { InstalledExtensionRow } from "@/components/extensions/extension-components"
import { toast } from "sonner"
import Link from "next/link"
const TABS = [{id:"explorar",l:"Explorar"},{id:"instaladas",l:"Instaladas"},{id:"activas",l:"Activas"},{id:"posicoes",l:"Posições"}]
export default function ActivesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">🧩 Extensões</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={`/dashboard/extensoes/${t.id}`}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "activas" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <p className="text-xs font-bold">2 activas</p>
      <Link href="/dashboard/extensoes/goals-bar/configurar"><InstalledExtensionRow icon="🎯" name="Goals Bar" position="Painel" active onToggle={() => toast.info("Desactivada")} /></Link>
      <Link href="/dashboard/extensoes/salos-alert/configurar"><InstalledExtensionRow icon="💛" name="Salos Alert" position="Overlay" active onToggle={() => toast.info("Desactivada")} /></Link>
    </div>
  )
}
