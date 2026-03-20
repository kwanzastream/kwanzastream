"use client"
import { useState } from "react"
import { SettingsSection, SettingsRow, SettingsSaveBar } from "@/components/settings/settings-components"
import { Input } from "@/components/ui/input"
import { User, Camera, Image } from "lucide-react"
import Link from "next/link"

const PROVINCIAS = ["Luanda","Benguela","Huambo","Huíla","Cabinda","Bengo","Bié","Cuando Cubango","Cuanza Norte","Cuanza Sul","Cunene","Kwanza Norte","Kwanza Sul","Lunda Norte","Lunda Sul","Malanje","Moxico","Namibe","Uíge","Zaire"]
const GENEROS = ["","Masculino","Feminino","Outro","Prefiro não dizer"]

export default function PerfilPage() {
  const [dirty, setDirty] = useState(false)
  const [nome, setNome] = useState("Streamer Angola")
  const [bio, setBio] = useState("Criador de conteúdo angolano")
  const [genero, setGenero] = useState("")
  const [provincia, setProvincia] = useState("Luanda")
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><User className="w-5 h-5" />Perfil Pessoal</h1>
      <SettingsSection title="Foto e Banner">
        <SettingsRow label="Foto de perfil" desc="JPG, PNG, WebP · 200×200px mínimo" href="/definicoes/perfil/foto"><Camera className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Banner do canal" desc="1200×340px recomendado" href="/definicoes/perfil/banner"><Image className="w-3 h-3 text-muted-foreground" /></SettingsRow>
      </SettingsSection>
      <SettingsSection title="Informações">
        <div className="space-y-3 p-3 rounded-xl border border-white/10">
          <div className="space-y-1"><p className="text-[10px] font-bold">Nome de display</p><Input value={nome} onChange={e => { setNome(e.target.value); setDirty(true) }} maxLength={50} className="bg-white/5" /></div>
          <div className="space-y-1"><p className="text-[10px] font-bold">Username</p><Input value="@streamer_ao" disabled className="bg-white/5 opacity-50" /><p className="text-[8px] text-muted-foreground">Pode ser alterado após 12 Abr 2026</p></div>
          <div className="space-y-1"><p className="text-[10px] font-bold">Bio</p><textarea value={bio} onChange={e => { setBio(e.target.value); setDirty(true) }} maxLength={300} rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /><p className="text-[8px] text-muted-foreground text-right">{bio.length}/300</p></div>
          <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Género</p><select value={genero} onChange={e => { setGenero(e.target.value); setDirty(true) }} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{GENEROS.map(g => <option key={g} value={g}>{g || "Seleccionar"}</option>)}</select></div><div className="space-y-1"><p className="text-[10px] font-bold">Província</p><select value={provincia} onChange={e => { setProvincia(e.target.value); setDirty(true) }} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{PROVINCIAS.map(p => <option key={p}>{p}</option>)}</select></div></div>
        </div>
      </SettingsSection>
      <SettingsSection title="Mais">
        <SettingsRow label="Bio completa" desc="Até 1500 caracteres" href="/definicoes/perfil/bio" />
        <SettingsRow label="Redes sociais" desc="Instagram, YouTube, TikTok..." href="/definicoes/perfil/redes-sociais" />
      </SettingsSection>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
