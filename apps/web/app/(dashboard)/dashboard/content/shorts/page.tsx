"use client"
import { ContentListItem } from "@/components/content-manager/content-components"
import Link from "next/link"
const SHORTS = [
  {id:"1",title:"Top 5 momentos da semana",sub:"20 Mar · 3.400 views · 78% conclusão",status:"public" as const},
  {id:"2",title:"Golo de bicicleta",sub:"18 Mar · 2.100 views · 85% conclusão",status:"public" as const},
  {id:"3",title:"Dica rápida: OBS",sub:"15 Mar · 1.200 views · 92% conclusão",status:"private" as const},
]
export default function ShortsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-lg font-black">Shorts</h1>
      <div className="space-y-1.5">{SHORTS.map(s => <Link key={s.id} href={`/dashboard/content/shorts/${s.id}`}><ContentListItem title={s.title} subtitle={s.sub} status={s.status} /></Link>)}</div>
    </div>
  )
}
