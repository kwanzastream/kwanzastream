"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
import Link from "next/link"
import { Bot, Terminal } from "lucide-react"
export default function BotsHubPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-6">
    <h1 className="text-xl font-bold">Bots</h1>
    <p className="text-sm text-muted-foreground">Bots automáticos para moderação, comandos e interacção no chat.</p>
    <div className="space-y-3">
      <Link href="/developers/docs/bots/chat-bots" className="flex gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
        <Bot className="w-5 h-5 text-primary" /><div><p className="text-sm font-semibold">Chat Bots</p><p className="text-xs text-muted-foreground">Conectar um bot ao chat via WebSocket</p></div>
      </Link>
      <Link href="/developers/docs/bots/comandos" className="flex gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
        <Terminal className="w-5 h-5 text-primary" /><div><p className="text-sm font-semibold">Comandos</p><p className="text-xs text-muted-foreground">Registar e responder a !comandos</p></div>
      </Link>
    </div>
  </div></div>)
}
