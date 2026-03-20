"use client"
import { ArrowLeft, Palette, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function IdentidadePage() {
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Palette className="w-5 h-5" />Identidade Visual</h1></div>
      <div className="space-y-3">
        <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-2">Cor de destaque</p><Link href="/definicoes/canal/cor-acento"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary" /><span className="text-xs text-muted-foreground">Alterar →</span></div></Link></div>
        <div className="p-3 rounded-xl border border-white/10 space-y-2"><p className="text-[10px] font-bold">Emote padrão do canal</p><div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">🔥</div><Button size="sm" className="text-xs gap-1"><Upload className="w-3 h-3" />Alterar emote</Button></div>
        <div className="p-3 rounded-xl border border-white/10 space-y-2"><p className="text-[10px] font-bold">Badges de subscritor (por tier)</p>{[1,2,3].map(t => <div key={t} className="flex items-center gap-3"><span className="text-[10px] text-muted-foreground">Tier {t}:</span><div className="w-6 h-6 rounded bg-white/5" /><Button size="sm" variant="ghost" className="text-[9px]">Alterar</Button></div>)}</div>
      </div>
    </div>
  )
}
