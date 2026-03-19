"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, FileCheck, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = [
  { username: "novo_membro_1", displayName: "Novo Membro 1", reason: "Adoro Kuduro e quero participar da comunidade!", date: "há 2h", status: "pending" },
  { username: "novo_membro_2", displayName: "Novo Membro 2", reason: "Sou DJ e quero partilhar mixes de Kuduro.", date: "há 6h", status: "pending" },
]

export default function TriboGerirCandidaturasPage() {
  const { slug } = useParams()
  const [apps, setApps] = useState(MOCK)

  const update = (username: string, status: string) => { setApps(prev => prev.map(a => a.username === username ? { ...a, status } : a)); toast.success(status === "approved" ? `@${username} aceite!` : `@${username} rejeitado`) }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/gerir`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><FileCheck className="w-5 h-5" />Candidaturas</h1></div>
      <div className="space-y-3">
        {apps.map(a => (
          <div key={a.username} className={`p-4 rounded-xl border ${a.status === "approved" ? "border-green-500/20 bg-green-500/5" : a.status === "rejected" ? "border-red-500/20 bg-red-500/5" : "border-white/10"}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{a.displayName[0]}</div>
              <div className="flex-1"><p className="text-sm font-bold">@{a.username}</p><p className="text-[9px] text-muted-foreground">{a.date}</p></div>
              {a.status !== "pending" && <Badge className={`text-[9px] ${a.status === "approved" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{a.status === "approved" ? "Aceite" : "Rejeitado"}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mb-2">"{a.reason}"</p>
            {a.status === "pending" && <div className="flex gap-2"><Button size="sm" className="flex-1 gap-1 text-xs" onClick={() => update(a.username, "approved")}><Check className="w-3 h-3" />Aceitar</Button><Button size="sm" variant="outline" className="flex-1 gap-1 text-xs" onClick={() => update(a.username, "rejected")}><X className="w-3 h-3" />Rejeitar</Button></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
