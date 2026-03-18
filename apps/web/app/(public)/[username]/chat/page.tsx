"use client"
import { useParams } from "next/navigation"
import { MessageSquare, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ChannelChatPage() {
  const { username } = useParams()
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Chat</h2>
        <Link href={`/${username}/chat/regras`} className="text-xs text-primary hover:underline">Regras do chat</Link>
      </div>
      <div className="rounded-xl border border-border/50 bg-muted/10 min-h-[400px] flex flex-col">
        <div className="flex-1 p-4 space-y-3">
          <div className="flex gap-2"><span className="text-xs font-medium text-primary">Sistema:</span><span className="text-xs text-muted-foreground">Bem-vindo ao chat de @{username}</span></div>
          <div className="flex gap-2"><span className="text-xs font-medium text-blue-400">moderador:</span><span className="text-xs">Chat aberto! Regras no link acima 👆</span></div>
        </div>
        <div className="border-t border-border/50 p-3">
          {isAuthenticated ? (
            <div className="flex gap-2">
              <input type="text" placeholder="Escreve uma mensagem..." className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
              <Button size="sm">Enviar</Button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Lock className="w-3 h-3" /><Link href={`/entrar?redirectTo=/${username}/chat`} className="text-primary hover:underline">Entra</Link> para participar no chat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
