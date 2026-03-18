"use client"
import { useParams } from "next/navigation"
import { Shield, BookOpen } from "lucide-react"
import Link from "next/link"

export default function StreamChatRegrasPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Regras do Chat</h1>
        </div>

        <div className="rounded-xl border border-white/10 p-6 space-y-4 bg-white/5">
          <p className="text-sm text-muted-foreground">Regras definidas por @{username}:</p>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span> Sê respeitoso com todos os membros da comunidade</li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span> Sem spam ou auto-promoção</li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span> Sem linguagem ofensiva ou discriminação</li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">4.</span> Não partilhes informações pessoais</li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">5.</span> Segue as indicações dos moderadores</li>
          </ol>
          <p className="text-xs text-muted-foreground border-t border-white/10 pt-4">
            Violações repetidas resultam em timeout ou ban permanente do chat.
          </p>
        </div>

        <div className="text-center">
          <Link href="/diretrizes-comunidade" className="text-xs text-primary hover:underline flex items-center justify-center gap-1">
            <BookOpen className="w-3 h-3" /> Diretrizes da plataforma Kwanza Stream
          </Link>
        </div>
      </div>
    </div>
  )
}
