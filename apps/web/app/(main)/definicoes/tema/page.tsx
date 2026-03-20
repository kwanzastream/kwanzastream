"use client"
import { Moon, Info } from "lucide-react"
export default function TemaPage() {
  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-lg font-bold flex items-center gap-2"><Moon className="w-5 h-5" />Tema</h1>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3"><Moon className="w-6 h-6 text-primary" /><div><p className="text-xs font-bold">Dark Mode</p><p className="text-[9px] text-muted-foreground">Tema actual — identidade da plataforma</p></div></div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-muted-foreground flex items-center gap-2"><Info className="w-3 h-3 text-primary shrink-0" />Light mode disponível em v2</div>
    </div>
  )
}
