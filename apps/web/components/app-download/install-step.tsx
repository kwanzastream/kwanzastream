"use client"
interface InstallStepProps { number: number; title: string; description?: string; highlight?: boolean }
export function InstallStep({ number, title, description, highlight }: InstallStepProps) {
  return (
    <div className={`flex gap-3 p-3 rounded-xl ${highlight ? "bg-primary/5 border border-primary/10" : ""}`}>
      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0">{number}</div>
      <div><p className="text-xs font-semibold">{title}</p>{description && <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>}</div>
    </div>
  )
}
