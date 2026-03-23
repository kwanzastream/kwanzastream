"use client"
import { useState } from "react"
import { PlatformSelector } from "@/components/app-download/platform-selector"
import { InstallStep } from "@/components/app-download/install-step"
import { PwaInstallButton } from "@/components/app-download/pwa-install-button"
const instructions: Record<string, { title: string; steps: { n: number; t: string; d?: string }[] }> = {
  "chrome-android": { title: "Chrome no Android", steps: [{ n: 1, t: "Abre kwanzastream.ao no Chrome" }, { n: 2, t: 'Verás um banner "Adicionar ao ecrã inicial"' }, { n: 3, t: 'Se não aparecer: Menu (⋮) → "Adicionar ao ecrã inicial"' }, { n: 4, t: "Confirma a instalação" }] },
  "samsung": { title: "Samsung Internet", steps: [{ n: 1, t: "Abre kwanzastream.ao no Samsung Internet" }, { n: 2, t: "Toca no ícone de menu (☰)" }, { n: 3, t: '"Adicionar página ao" → "Ecrã inicial"' }] },
  "safari-ios": { title: "Safari (iOS)", steps: [{ n: 1, t: "Abre kwanzastream.ao no Safari", d: "Obrigatório — não funciona noutros browsers" }, { n: 2, t: "Toca no ícone de partilha (□↑)" }, { n: 3, t: '"Adicionar ao ecrã de início"' }, { n: 4, t: 'Confirma "Adicionar"' }] },
  "chrome-desktop": { title: "Chrome (Desktop)", steps: [{ n: 1, t: "Abre kwanzastream.ao no Chrome" }, { n: 2, t: 'Clica em ⊕ "Instalar Kwanza Stream" na barra de endereço' }, { n: 3, t: 'Confirma "Instalar"' }] },
  "edge": { title: "Edge (Desktop)", steps: [{ n: 1, t: "Abre kwanzastream.ao no Edge" }, { n: 2, t: 'Menu (⋯) → "Apps" → "Instalar este site como app"' }, { n: 3, t: 'Confirma "Instalar"' }] },
}
export default function PwaInstalarPage() {
  const [platform, setPlatform] = useState("chrome-android")
  const ins = instructions[platform]
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Instalar PWA — Guia completo</h1>
      <PlatformSelector onSelect={setPlatform} />
      <div className="space-y-1"><h2 className="text-sm font-semibold">{ins.title}</h2>{ins.steps.map(s => <InstallStep key={s.n} number={s.n} title={s.t} description={s.d} />)}<div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20"><p className="text-xs text-green-400">✅ Pronto!</p></div></div>
      <PwaInstallButton />
    </div>
  )
}
