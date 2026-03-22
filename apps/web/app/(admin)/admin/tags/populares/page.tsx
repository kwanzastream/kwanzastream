"use client"
export default function TagsPopularesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Tags Populares</h1>
  <div className="space-y-2">{[{ tag: "Português", count: 234 }, { tag: "Gaming", count: 189 }, { tag: "Angola", count: 156 }, { tag: "Kuduro", count: 89 }, { tag: "FIFA", count: 67 }].map(t => <div key={t.tag} className="p-3 rounded-xl border border-white/10 flex items-center justify-between"><span className="text-xs">{t.tag}</span><span className="text-xs text-muted-foreground">{t.count} streams</span></div>)}</div></div>) }
