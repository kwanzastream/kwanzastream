"use client"
export default function ModeracaoFiltrosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Filtros de Palavras</h1>
  <div className="space-y-2">{["Insultos", "Spam keywords", "Phishing URLs", "Conteúdo político", "Discriminação"].map(f => <div key={f} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs">{f}</span><span className="text-[10px] text-green-400">✅ Activo</span></div>)}</div>
  <textarea placeholder="Adicionar palavras bloqueadas (uma por linha)..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[80px]" /></div>) }
