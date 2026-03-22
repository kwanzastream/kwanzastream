"use client"
import { useParams } from "next/navigation"
export default function UserReportsPage() { const { id } = useParams(); return (<div className="space-y-4"><h1 className="text-xl font-bold">Reports</h1><p className="text-xs text-muted-foreground">Reports feitos contra ou por este utilizador</p>
  <div className="p-4 rounded-xl border border-white/10 text-center text-xs text-muted-foreground">Nenhum report encontrado</div></div>) }
