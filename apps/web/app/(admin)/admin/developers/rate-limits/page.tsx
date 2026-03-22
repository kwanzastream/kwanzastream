"use client"
export default function DevRateLimitsPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Rate Limits</h1>
  <div className="space-y-2">{[{ tier: "Free", limit: "100 req/min" }, { tier: "Basic", limit: "500 req/min" }, { tier: "Pro", limit: "2000 req/min" }].map(r => <div key={r.tier} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs font-semibold">{r.tier}</span><span className="text-xs text-muted-foreground">{r.limit}</span></div>)}</div></div>) }
