"use client"
export default function TorneioCatsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Categorias de Torneios</h1>
  <div className="space-y-2">{["FIFA", "CS2", "Mobile Legends", "Free Fire"].map(c => <div key={c} className="p-3 rounded-xl border border-white/10 text-xs">{c}</div>)}</div></div>) }
