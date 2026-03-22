"use client"
import { CreatorAngolaCard } from "@/components/angola/creator-angola-card"
export default function TopCriadoresPage() {
  const top = [
    { id: "c1", username: "voz-angola", displayName: "Voz de Angola", avgViewers: 1234, province: "Luanda", category: "Gaming", isLive: true },
    { id: "c2", username: "kuduro-king", displayName: "Kuduro King", avgViewers: 987, province: "Benguela", category: "Música", isLive: true },
    { id: "c3", username: "girabola-cast", displayName: "Girabola Cast", avgViewers: 756, province: "Luanda", category: "Futebol", isLive: false },
    { id: "c4", username: "chef-angola", displayName: "Chef Angola", avgViewers: 543, province: "Huambo", category: "Culinária", isLive: true },
    { id: "c5", username: "code-luanda", displayName: "Code Luanda", avgViewers: 321, province: "Luanda", category: "Tecnologia", isLive: false },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">🏆 Top Criadores Angola</h1>
    <div className="space-y-2">{top.map((c, i) => <div key={c.id} className="flex items-center gap-3"><span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span><div className="flex-1"><CreatorAngolaCard {...c} /></div></div>)}</div>
  </div>)
}
