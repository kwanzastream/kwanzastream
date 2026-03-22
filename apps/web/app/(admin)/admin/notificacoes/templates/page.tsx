"use client"
export default function NotificacoesTemplatesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Templates</h1>
  <div className="space-y-2">{["Bem-vindo", "KYC aprovado", "Levantamento processado", "Stream ao vivo", "Novo seguidor"].map(t => <div key={t} className="p-3 rounded-xl border border-white/10 text-xs">{t}</div>)}</div></div>) }
