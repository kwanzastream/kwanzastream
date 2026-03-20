"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { Globe } from "lucide-react"
export default function IdiomaPage() {
  const [lang, setLang] = useState("pt-ao")
  const [content, setContent] = useState(["pt"])
  const [dirty, setDirty] = useState(false)
  const LANGS = [{ id: "pt-ao", label: "Português (Angola)" }, { id: "pt-pt", label: "Português (Portugal)" }, { id: "en", label: "English" }]
  const CONTENT = [{ id: "pt", label: "Português" }, { id: "en", label: "Inglês" }, { id: "fr", label: "Francês" }, { id: "ki", label: "Kikongo" }, { id: "km", label: "Kimbundu" }, { id: "um", label: "Umbundu" }]
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><Globe className="w-5 h-5" />Idioma</h1>
      <div className="space-y-2"><p className="text-[10px] font-bold">Idioma da interface</p>{LANGS.map(l => <label key={l.id} className="flex items-center gap-2 p-2 rounded-xl border border-white/10 cursor-pointer"><input type="radio" name="lang" checked={lang === l.id} onChange={() => { setLang(l.id); setDirty(true) }} /><span className="text-xs">{l.label}</span></label>)}</div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Idioma do conteúdo preferido</p>{CONTENT.map(c => <label key={c.id} className="flex items-center gap-2 p-2 rounded-xl border border-white/10 cursor-pointer"><input type="checkbox" checked={content.includes(c.id)} onChange={e => { setContent(e.target.checked ? [...content, c.id] : content.filter(x => x !== c.id)); setDirty(true) }} /><span className="text-xs">{c.label}</span></label>)}</div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
