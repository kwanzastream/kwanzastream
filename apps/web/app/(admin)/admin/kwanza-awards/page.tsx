"use client"
export default function KwanzaAwardsAdminPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Kwanza Awards — Admin</h1>
  <div className="grid grid-cols-3 gap-3">{[{ l: "Edição", v: "2026" }, { l: "Status", v: "Nomeações abertas" }, { l: "Votos total", v: "0" }].map(m => <div key={m.l} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.v}</p><p className="text-[9px] text-muted-foreground">{m.l}</p></div>)}</div>
  <div className="flex gap-2 flex-wrap">{["categorias","nomeados","gerir","vencedores"].map(t => <a key={t} href={`/admin/kwanza-awards/${t}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] capitalize">{t}</a>)}</div></div>) }
