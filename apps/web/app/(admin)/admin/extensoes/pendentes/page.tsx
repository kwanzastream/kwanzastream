"use client"
export default function ExtensoesPendentesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Extensões Pendentes</h1>
  <div className="space-y-2">{[{ name: "Overlay Stats", dev: "dev-ao-1", type: "overlay" }].map(e => <div key={e.name} className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-semibold">{e.name}</p><p className="text-[10px] text-muted-foreground">@{e.dev} · {e.type} · Aguarda revisão</p></div>)}</div></div>) }
