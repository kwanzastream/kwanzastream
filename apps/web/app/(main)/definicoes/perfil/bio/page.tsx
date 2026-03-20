"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function BioPage() {
  const [bio, setBio] = useState("Bio completa do canal com mais detalhes sobre o criador, os seus conteúdos e o que os viewers podem esperar.")
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/perfil"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Bio Completa</h1></div>
      <p className="text-[10px] text-muted-foreground">Aparece na página /sobre do teu canal. Máximo 1500 caracteres.</p>
      <textarea value={bio} onChange={e => { setBio(e.target.value); setDirty(true) }} maxLength={1500} rows={10} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" />
      <p className="text-[8px] text-muted-foreground text-right">{bio.length}/1500</p>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
