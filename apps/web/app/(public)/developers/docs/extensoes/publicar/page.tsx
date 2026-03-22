"use client"
import { DocsSidebar } from "@/components/developers/docs-sidebar"
export default function PublicarExtensaoPage() {
  return (<div className="max-w-5xl mx-auto px-4 py-8 flex gap-8"><DocsSidebar /><div className="flex-1 space-y-4">
    <h1 className="text-xl font-bold">Publicar Extensão</h1>
    <p className="text-xs text-muted-foreground">Submete a tua extensão para revisão e publicação.</p>
    <div className="space-y-3">
      {[{ title: "1. Testa no sandbox", desc: "Garante que funciona em diferentes resoluções e browsers" },
        { title: "2. Prepara o pacote", desc: "ZIP com index.html + assets (máx 1MB)" },
        { title: "3. Preenche metadados", desc: "Nome, descrição, screenshots, categorias" },
        { title: "4. Submete para review", desc: "A equipa revê em 3-5 dias úteis" },
        { title: "5. Publicação", desc: "Após aprovação, fica disponível para todos os canais" }].map((s, i) =>
        <div key={i} className="p-4 rounded-xl border border-white/10"><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
      )}
    </div>
  </div></div>)
}
