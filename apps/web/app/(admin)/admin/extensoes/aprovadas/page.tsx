"use client"
export default function ExtApprovadasPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Extensões Aprovadas</h1>
  <div className="space-y-2">{[{ name: "Stream Alerts", dev: "dev1", installs: 234 }, { name: "Chat Overlay", dev: "dev2", installs: 156 }].map(e => <div key={e.name} className="p-3 rounded-xl border border-green-500/20 bg-green-500/5"><p className="text-xs font-semibold">{e.name}</p><p className="text-[10px] text-muted-foreground">@{e.dev} · {e.installs} instalações</p></div>)}</div></div>) }
