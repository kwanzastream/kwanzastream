"use client"
import { PollResultCard } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const POLLS = [
  {question:"Que jogo jogar a seguir?",options:[{label:"FIFA 26",votes:45,winner:true},{label:"CoD",votes:23},{label:"GTA VI",votes:12}],total:80,date:"20 Mar 2026"},
  {question:"Formato preferido?",options:[{label:"Stream longo (3h+)",votes:34,winner:true},{label:"Stream curto (1h)",votes:18}],total:52,date:"18 Mar 2026"},
]
export default function PollsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Polls</h1>
      <Button variant="outline" size="sm" className="text-xs w-full" asChild><Link href="/dashboard/stream-manager/polls">Criar poll (Stream Manager) →</Link></Button>
      <div className="space-y-1.5">{POLLS.map((p,i) => <PollResultCard key={i} {...p} />)}</div>
    </div>
  )
}
