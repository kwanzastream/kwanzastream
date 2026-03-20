"use client"
import { useState } from "react"
import { SettingsSection, SettingsRow, SettingsSaveBar } from "@/components/settings/settings-components"
import { Eye, UserX, Database, Download, Trash2 } from "lucide-react"
export default function PrivacidadePage() {
  const [dirty, setDirty] = useState(false)
  const [dms, setDms] = useState("seguidos")
  const [followers, setFollowers] = useState("todos")
  const [achievements, setAchievements] = useState("todos")
  const [seo, setSeo] = useState(true)
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><Eye className="w-5 h-5" />Privacidade</h1>
      <SettingsSection title="Visibilidade">
        <div className="space-y-3 p-3 rounded-xl border border-white/10">
          {[{l:"Quem pode enviar DMs",v:dms,o:["todos","seguidos","ninguem"],ol:["Todos","Só seguidos mútuos","Ninguém"],fn:setDms},{l:"Quem pode ver seguidores",v:followers,o:["todos","eu"],ol:["Todos","Só eu"],fn:setFollowers},{l:"Quem pode ver conquistas",v:achievements,o:["todos","eu"],ol:["Todos","Só eu"],fn:setAchievements}].map(f => <div key={f.l} className="flex items-center justify-between"><p className="text-xs">{f.l}</p><select value={f.v} onChange={e => { f.fn(e.target.value); setDirty(true) }} className="h-8 rounded-md bg-white/5 border border-white/10 px-2 text-xs">{f.o.map((o,i) => <option key={o} value={o}>{f.ol[i]}</option>)}</select></div>)}
          <div className="flex items-center justify-between"><p className="text-xs">Indexação motores de busca</p><button onClick={() => { setSeo(!seo); setDirty(true) }} className={`w-10 h-5 rounded-full transition-all ${seo ? "bg-primary" : "bg-white/20"}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${seo ? "translate-x-5" : "translate-x-0.5"}`} /></button></div>
        </div>
      </SettingsSection>
      <SettingsSection title="Dados">
        <SettingsRow label="Utilizadores bloqueados" href="/definicoes/privacidade/bloqueados"><UserX className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Os meus dados" href="/definicoes/privacidade/dados-pessoais"><Database className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Exportar dados" href="/definicoes/privacidade/exportar-dados"><Download className="w-3 h-3 text-muted-foreground" /></SettingsRow>
        <SettingsRow label="Eliminar conta" href="/definicoes/privacidade/eliminar-conta"><Trash2 className="w-3 h-3 text-red-400" /></SettingsRow>
      </SettingsSection>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
