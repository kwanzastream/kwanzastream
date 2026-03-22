"use client"
export function PolicyLastUpdated({ date }: { date: string }) {
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px]">📅 Última actualização: {date}</span>
}
