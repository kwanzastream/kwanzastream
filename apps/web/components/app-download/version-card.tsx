"use client"
import Link from "next/link"
interface VersionCardProps { version: string; date: string; title: string; features: string[] }
export function VersionCard({ version, date, title, features }: VersionCardProps) {
  return (
    <Link href={`/app/novidades/${version}`} className="block p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">v{version}</p><span className="text-[9px] text-muted-foreground">{date}</span></div>
      <p className="text-[10px] text-primary mt-0.5">{title}</p>
      <ul className="mt-2 space-y-0.5">{features.slice(0, 3).map((f, i) => <li key={i} className="text-[9px] text-muted-foreground">✅ {f}</li>)}{features.length > 3 && <li className="text-[9px] text-primary">+{features.length - 3} mais →</li>}</ul>
    </Link>
  )
}
