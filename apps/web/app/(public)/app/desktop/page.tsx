import type { Metadata } from "next"
export const metadata: Metadata = { title: "App Desktop | Kwanza Stream", description: "Descarrega o Kwanza Stream para Windows e Mac." }

import Link from "next/link"
export default function DesktopHubPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">💻 Kwanza Stream no Desktop</h1>
      <div className="grid grid-cols-2 gap-3"><Link href="/app/desktop/windows" className="p-4 rounded-xl border border-white/10 hover:border-white/20 text-center"><div className="text-2xl mb-1">💻</div><p className="text-xs font-semibold">Windows</p></Link><Link href="/app/desktop/mac" className="p-4 rounded-xl border border-white/10 hover:border-white/20 text-center"><div className="text-2xl mb-1">🍎</div><p className="text-xs font-semibold">Mac</p></Link></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-xs font-semibold">Ou usa directamente no browser</p><p className="text-[10px] text-muted-foreground mt-1">Chrome, Firefox, Edge, Safari — nenhuma instalação necessária. Todas as funcionalidades disponíveis.</p></div>
      <div className="p-3 rounded-xl bg-white/5"><p className="text-[10px] text-muted-foreground">🔧 Instalar como app desktop (PWA):</p><p className="text-[10px] text-muted-foreground">Chrome/Edge: barra de endereço → ícone de instalação (⊕)</p></div>
    </div>
  )
}
