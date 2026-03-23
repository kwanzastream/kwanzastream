"use client"
import Link from "next/link"
interface PlatformCardProps { icon: string; name: string; status: string; href: string; recommended?: boolean }
export function PlatformCard({ icon, name, status, href, recommended }: PlatformCardProps) {
  return (
    <Link href={href} className={`block p-4 rounded-xl border transition-colors text-center ${recommended ? "border-primary/30 bg-primary/5 hover:border-primary/50" : "border-white/10 hover:border-white/20"}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-xs font-semibold">{name}</p>
      <p className={`text-[9px] mt-0.5 ${status === "Disponível" || status === "Instalar agora" ? "text-green-400" : "text-muted-foreground"}`}>{status}</p>
      {recommended && <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[8px]">⭐ Recomendado</span>}
    </Link>
  )
}
