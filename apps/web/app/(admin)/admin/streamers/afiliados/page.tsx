"use client"
export default function AfiliadosPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Afiliados</h1><p className="text-xs text-muted-foreground">Streamers com status de afiliado</p>
  <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">@afiliado-{i}</p><p className="text-[10px] text-muted-foreground">Afiliado desde Mar 2026 · Salos: {i*1200} Kz/mês</p></div>)}</div></div>) }
