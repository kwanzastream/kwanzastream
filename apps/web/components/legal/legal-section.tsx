"use client"
interface LegalSectionProps { id: string; title: string; children: React.ReactNode }
export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 space-y-2">
      <h2 className="text-base font-bold border-b border-white/5 pb-1">{title}</h2>
      <div className="text-xs text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  )
}
