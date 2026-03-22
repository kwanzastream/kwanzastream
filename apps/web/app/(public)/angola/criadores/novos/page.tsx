"use client"
export default function NovosCriadoresPage() {
  const novos = [
    { username: "novo-streamer-1", displayName: "Novo Streamer 1", province: "Huíla", joined: "há 3 dias" },
    { username: "novo-streamer-2", displayName: "Novo Streamer 2", province: "Cabinda", joined: "há 5 dias" },
    { username: "novo-streamer-3", displayName: "Novo Streamer 3", province: "Malanje", joined: "há 1 semana" },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">🆕 Novos Criadores</h1>
    <div className="space-y-2">{novos.map(c => (
      <div key={c.username} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{c.displayName[0]}</div>
        <div><p className="text-sm font-semibold">{c.displayName}</p><p className="text-[10px] text-muted-foreground">@{c.username} · {c.province} · {c.joined}</p></div>
      </div>
    ))}</div>
  </div>)
}
