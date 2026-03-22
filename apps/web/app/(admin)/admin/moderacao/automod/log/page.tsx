"use client"
export default function AutomodLogPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">AutoMod — Log de Acções</h1>
  <div className="space-y-1">{[{ action: "Mensagem bloqueada", user: "viewer1", reason: "Spam", time: "há 5min" }, { action: "Timeout automático", user: "spammer2", reason: "Phishing URL", time: "há 15min" }].map((l,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-[10px]"><span>{l.action}: @{l.user} — {l.reason} ({l.time})</span></div>)}</div></div>) }
