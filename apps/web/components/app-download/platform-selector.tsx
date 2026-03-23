"use client"
import { useState } from "react"
const options = [{ id: "chrome-android", label: "Chrome (Android)" }, { id: "samsung", label: "Samsung Internet" }, { id: "safari-ios", label: "Safari (iOS)" }, { id: "chrome-desktop", label: "Chrome (Desktop)" }, { id: "edge", label: "Edge (Desktop)" }]
export function PlatformSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [active, setActive] = useState("chrome-android")
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => <button key={o.id} onClick={() => { setActive(o.id); onSelect(o.id) }} className={`px-3 py-1.5 rounded-full text-[10px] transition-colors ${active === o.id ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{o.label}</button>)}
    </div>
  )
}
