"use client"
import Link from "next/link"
interface CTA { label: string; href: string }
export function ErrorCtaGroup({ primary, secondary }: { primary?: CTA; secondary?: CTA }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {primary && <Link href={primary.href} className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">{primary.label}</Link>}
      {secondary && <Link href={secondary.href} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs hover:bg-white/5 transition-colors">{secondary.label}</Link>}
    </div>
  )
}
