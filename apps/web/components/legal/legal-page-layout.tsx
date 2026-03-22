"use client"
import Link from "next/link"

interface LegalPageLayoutProps { title: string; lastUpdated: string; children: React.ReactNode; toc?: { id: string; label: string }[] }

export function LegalPageLayout({ title, lastUpdated, children, toc }: LegalPageLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[240px_1fr] gap-8">
      {toc && toc.length > 0 && (
        <aside className="hidden lg:block sticky top-20 h-fit space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Índice</p>
          {toc.map(item => (
            <a key={item.id} href={`#${item.id}`} className="block text-xs text-muted-foreground hover:text-foreground py-0.5 transition-colors">{item.label}</a>
          ))}
          <hr className="border-white/5 my-3" />
          <a href="#" className="text-[10px] text-primary hover:underline">⬆ Topo</a>
        </aside>
      )}
      <main className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-[10px] text-muted-foreground mt-1">Última actualização: {lastUpdated}</p>
        </div>
        <div className="prose prose-invert prose-sm max-w-none space-y-6">{children}</div>
        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <Link href="/termos" className="text-[10px] text-muted-foreground hover:text-foreground">← Termos</Link>
          <button onClick={() => window.print()} className="text-[10px] text-primary hover:underline">📄 Descarregar PDF</button>
        </div>
      </main>
    </div>
  )
}
