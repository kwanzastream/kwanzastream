"use client"
import { ChecklistProgressBar, ChecklistCard, type ChecklistStep } from "@/components/dashboard/dashboard-home-components"
import { ArrowLeft, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CHECKLIST: ChecklistStep[] = [
  { id: "account", title: "Criar conta", desc: "Bem-vindo à Kwanza Stream!", completed: true },
  { id: "username", title: "Definir username", desc: "O teu nome único na plataforma", completed: true },
  { id: "photo", title: "Adicionar foto de perfil", desc: "A tua cara é a tua marca. JPG, PNG, WebP.", href: "/definicoes/perfil/foto", completed: false },
  { id: "bio", title: "Escrever bio do canal", desc: "Conta aos viewers quem és (máximo 300 caracteres)", href: "/definicoes/perfil/bio", completed: false },
  { id: "category", title: "Escolher categoria principal", desc: "Para que os viewers te encontrem mais facilmente", href: "/definicoes/canal", completed: false },
  { id: "stream-key", title: "Configurar stream key", desc: "Conecta o OBS ou transmite pelo telemóvel", href: "/dashboard/inicio/checklist/stream-key", completed: false },
  { id: "first-stream", title: "Fazer o primeiro stream", desc: "O mais importante — vai a tempo!", href: "/go-live", completed: false },
]

export default function ChecklistPage() {
  const completed = CHECKLIST.filter(s => s.completed).length
  const allDone = completed === CHECKLIST.length
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/inicio"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Checklist de Activação</h1></div>
      <ChecklistProgressBar completed={completed} total={CHECKLIST.length} />
      {allDone && <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20 text-center space-y-2"><PartyPopper className="w-10 h-10 text-green-400 mx-auto" /><p className="text-sm font-bold text-green-400">Canal totalmente configurado! 🎉</p><p className="text-[10px] text-muted-foreground">Estás pronto para crescer na Kwanza Stream.</p></div>}
      <div className="space-y-1.5">{CHECKLIST.map((s, i) => <ChecklistCard key={s.id} step={s} index={i} />)}</div>
      <p className="text-[9px] text-muted-foreground text-center">Passos 1–2 são automáticos. Os restantes podes completar a qualquer momento.</p>
    </div>
  )
}
