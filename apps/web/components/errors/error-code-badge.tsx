"use client"
export function ErrorCodeBadge({ code }: { code: number }) {
  const colors: Record<number, string> = { 404: "text-yellow-400 bg-yellow-500/10", 500: "text-red-400 bg-red-500/10", 403: "text-orange-400 bg-orange-500/10" }
  return <span className={`inline-block px-3 py-1 rounded-full text-sm font-black ${colors[code] || "text-muted-foreground bg-white/5"}`}>{code}</span>
}
