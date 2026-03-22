"use client"
export default function AdminEditarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Editar Admin</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Username", v: "@ks-moderacao" }, { l: "Email", v: "moderacao@kwanzastream.ao" }, { l: "Role", v: "moderator" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input defaultValue={f.v} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}</div></div>) }
