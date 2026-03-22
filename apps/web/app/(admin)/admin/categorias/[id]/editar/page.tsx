"use client"
export default function CategoriaEditarPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Editar Categoria</h1>
  <div className="max-w-lg space-y-3">{[{ l: "Nome", v: "Gaming" }, { l: "Slug", v: "gaming" }, { l: "Descrição", v: "Jogos e esports" }].map(f => <div key={f.l}><label className="text-[10px] text-muted-foreground">{f.l}</label><input defaultValue={f.v} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>)}</div></div>) }
