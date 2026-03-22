"use client"
export default function AwardsCatsAdminPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Categorias dos Awards</h1>
  <div className="space-y-2">{["Melhor Streamer", "Melhor Gaming", "Revelação", "Melhor Comunidade", "Melhor Conteúdo Educativo"].map(c => <div key={c} className="p-3 rounded-xl border border-white/10 text-xs">{c}</div>)}</div></div>) }
