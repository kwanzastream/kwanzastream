"use client"
export default function CategoriaStreamsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Streams desta Categoria</h1>
  <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">Stream #{i}</p><p className="text-[10px] text-muted-foreground">@streamer-{i} · {100+i*20} viewers</p></div>)}</div></div>) }
