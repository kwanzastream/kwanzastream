"use client"
export default function LojaCatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Categorias da Loja</h1>
  <div className="space-y-2">{["Vestuário", "Acessórios", "Digital", "Emotes"].map(c => <div key={c} className="p-3 rounded-xl border border-white/10 text-xs">{c}</div>)}</div></div>) }
