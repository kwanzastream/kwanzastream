"use client"
import { useState } from "react"
import { SettingsSection, SettingsRow, SettingsSaveBar } from "@/components/settings/settings-components"
import { Input } from "@/components/ui/input"
import { Tv, Palette, Star, List, Radio, Video, Image } from "lucide-react"

const CATEGORIAS = ["Gaming","Música","Comédia","Desporto","Educação","Arte","Culinária","Tecnologia","Lifestyle","Outro"]

export default function CanalPage() {
  const [dirty, setDirty] = useState(false)
  const [nome, setNome] = useState("Canal do Streamer")
  const [tagline, setTagline] = useState("O melhor conteúdo angolano")
  const [cat, setCat] = useState("Gaming")
  const [lingua, setLingua] = useState("Português")
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><Tv className="w-5 h-5" />Configurações do Canal</h1>
      <SettingsSection title="Identidade">
        <div className="space-y-3 p-3 rounded-xl border border-white/10">
          <div className="space-y-1"><p className="text-[10px] font-bold">Nome do canal</p><Input value={nome} onChange={e => { setNome(e.target.value); setDirty(true) }} className="bg-white/5" /></div>
          <div className="space-y-1"><p className="text-[10px] font-bold">Tagline</p><Input value={tagline} onChange={e => { setTagline(e.target.value); setDirty(true) }} maxLength={100} className="bg-white/5" /><p className="text-[8px] text-muted-foreground text-right">{tagline.length}/100</p></div>
          <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Categoria</p><select value={cat} onChange={e => { setCat(e.target.value); setDirty(true) }} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{CATEGORIAS.map(c => <option key={c}>{c}</option>)}</select></div><div className="space-y-1"><p className="text-[10px] font-bold">Língua</p><select value={lingua} onChange={e => setLingua(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Português</option><option>English</option></select></div></div>
        </div>
      </SettingsSection>
      <SettingsSection title="Visual e Conteúdo">
        <SettingsRow label="Identidade visual" desc="Cor, emotes, badges" href="/definicoes/canal/identidade"><Palette className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Cor de destaque" href="/definicoes/canal/cor-acento"><div className="w-4 h-4 rounded-full bg-primary" /></SettingsRow>
        <SettingsRow label="Conteúdo em destaque" href="/definicoes/canal/featured"><Star className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Prateleira de canais" desc="Máximo 10" href="/definicoes/canal/shelf" />
        <SettingsRow label="Categorias recentes" href="/definicoes/canal/categorias-recentes"><List className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Modo Rádio" href="/definicoes/canal/modo-radio"><Radio className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Trailer do canal" desc="Máx 90s" href="/definicoes/canal/trailer"><Video className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Banner offline" href="/definicoes/canal/banner-offline"><Image className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      </SettingsSection>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
