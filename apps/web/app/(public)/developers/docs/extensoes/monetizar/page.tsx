"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
export default function MonetizarExtensaoPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Monetizar Extensão</h1>
    <p className="text-xs text-muted-foreground">Ganha revenue com a tua extensão (disponível em v2).</p>
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-white/10"><p className="text-sm font-semibold">Revenue Share</p><p className="text-xs text-muted-foreground">70% developer / 30% plataforma para compras in-extension</p></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-sm font-semibold">Salos in Extensions</p><p className="text-xs text-muted-foreground">Viewers podem enviar Salos directamente na extensão (v2)</p></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-sm font-semibold">Subscriptions</p><p className="text-xs text-muted-foreground">Conteúdo premium dentro da extensão só para subscritores (v2)</p></div>
    </div>
    <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground">⏳ Funcionalidade em desenvolvimento — disponível no Q3 2026.</div>
  </div></div>)
}
