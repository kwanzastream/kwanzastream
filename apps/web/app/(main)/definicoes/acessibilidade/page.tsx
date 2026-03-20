"use client"
import { SettingsRow } from "@/components/settings/settings-components"
import { Accessibility, Palette, Type, Sparkles } from "lucide-react"
export default function AcessibilidadePage() {
  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-lg font-bold flex items-center gap-2"><Accessibility className="w-5 h-5" />Acessibilidade</h1>
      <SettingsRow label="Cores" desc="Alto contraste, daltonismo" href="/definicoes/acessibilidade/cores"><Palette className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Tamanho de texto" desc="Pequeno / Normal / Grande" href="/definicoes/acessibilidade/tamanho-texto"><Type className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      <SettingsRow label="Animações" desc="Reduzir movimento" href="/definicoes/acessibilidade/animacoes"><Sparkles className="w-3 h-3 text-muted-foreground" /></SettingsRow>
    </div>
  )
}
