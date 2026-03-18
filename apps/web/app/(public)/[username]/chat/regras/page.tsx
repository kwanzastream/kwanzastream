"use client"
import { useParams } from "next/navigation"
import { Shield } from "lucide-react"

export default function ChatRegrasPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-lg">Regras do chat</h2>
      </div>
      <div className="rounded-xl border border-border/50 p-6 space-y-4 bg-muted/10">
        <p className="text-sm text-muted-foreground">Regras definidas por @{username}:</p>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span> Sê respeitoso com todos os membros da comunidade</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span> Sem spam ou auto-promoção</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span> Sem linguagem ofensiva ou discriminação</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">4.</span> Não partilhes informações pessoais</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">5.</span> Segue as indicações dos moderadores</li>
        </ol>
        <p className="text-xs text-muted-foreground border-t border-border/50 pt-4">Violações repetidas resultam em timeout ou ban permanente do chat.</p>
      </div>
    </div>
  )
}
