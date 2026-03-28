"use client"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [{key:"metrica",label:"Métrica"},{key:"hoje",label:"Hoje"},{key:"semana",label:"Semana"},{key:"mes",label:"Mês"},{key:"variacao",label:"Variação"}]
const DATA = [{metrica:"Novos utilizadores",hoje:"45",semana:"312",mes:"1.250",variacao:"+12%"},{metrica:"Novas streams",hoje:"12",semana:"84",mes:"340",variacao:"+8%"},{metrica:"Viewers únicos",hoje:"890",semana:"5.2k",mes:"18k",variacao:"+15%"},{metrica:"Tempo médio viewing",hoje:"32min",semana:"28min",mes:"35min",variacao:"+5%"},{metrica:"Registos mobile",hoje:"28",semana:"196",mes:"780",variacao:"+20%"}]

export default function AdminCrescimentoPage() {
  return <AdminPage title="Analytics — Crescimento" description="Métricas de crescimento da plataforma." icon="📈" columns={COLUMNS} data={DATA} actions={[{label:"Exportar CSV",variant:"outline"}]} />
}