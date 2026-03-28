"use client"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [{key:"endpoint",label:"Endpoint"},{key:"requests",label:"Requests/min"},{key:"p95",label:"P95 (ms)"},{key:"errors",label:"Erros"},{key:"status",label:"Estado"}]
const DATA = [{endpoint:"/api/streams/live",requests:"120",p95:"45",errors:"0",status:"OK"},{endpoint:"/api/auth/login",requests:"35",p95:"180",errors:"2",status:"OK"},{endpoint:"/api/chat/messages",requests:"450",p95:"12",errors:"0",status:"OK"},{endpoint:"/api/wallet/balance",requests:"80",p95:"95",errors:"1",status:"OK"}]

export default function AdminTecnicoPage() {
  return <AdminPage title="Analytics — Técnico" description="Métricas técnicas e performance." icon="⚙️" columns={COLUMNS} data={DATA} actions={[{label:"Ver logs",variant:"outline"}]} />
}