"use client"
export default function LojaVendedoresPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Vendedores</h1>
  <div className="space-y-2">{[{ u: "streamer1", products: 5, sales: "12.000 Kz" }].map(v => <div key={v.u} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-semibold">@{v.u}</p><p className="text-[10px] text-muted-foreground">{v.products} produtos · Vendas: {v.sales}</p></div>)}</div></div>) }
