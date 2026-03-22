"use client"
export default function AdminLogsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Logs do Admin</h1>
  <div className="space-y-1">{[{ action: "user.ban", target: "@spammer1", time: "09:23" }, { action: "feature-flag.toggle", target: "SHORTS_FEED", time: "09:15" }].map((l,i) => <div key={i} className="p-2 rounded-lg border border-white/5 text-[10px] flex items-center justify-between"><span>{l.action} → {l.target}</span><span className="text-muted-foreground">{l.time}</span></div>)}</div></div>) }
