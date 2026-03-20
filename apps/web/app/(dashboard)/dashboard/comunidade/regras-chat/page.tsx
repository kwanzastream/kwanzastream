"use client"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import Link from "next/link"
const RULES = ["Respeita todos os viewers","Sem spam ou flood","Sem linguagem ofensiva","Fala português (PT-AO)","Sem links sem autorização"]
export default function RegrasChatPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">📋 Regras do Chat</h1><Link href="/dashboard/comunidade/regras-chat/editar"><Button size="sm" className="gap-1 text-xs"><Edit2 className="w-3 h-3" />Editar</Button></Link></div>
      <div className="space-y-1">{RULES.map((r,i) => <div key={i} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><span className="text-xs font-bold text-primary w-5">{i+1}</span><span className="text-xs">{r}</span></div>)}</div>
    </div>
  )
}
