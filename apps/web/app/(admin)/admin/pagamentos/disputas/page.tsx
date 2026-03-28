"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"comprador",label:"Comprador"},{key:"vendedor",label:"Vendedor"},{key:"valor",label:"Valor"},{key:"razao",label:"Razão"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#DP-12",comprador:"viewer1",vendedor:"streamer1",valor:"5.000 Kz",razao:"Salo não recebido",estado:"Em análise"},{id:"#DP-11",comprador:"viewer2",vendedor:"streamer2",valor:"2.500 Kz",razao:"Cobrança duplicada",estado:"Resolvida"}]
export default function AdminDisputasPage() {
  return <AdminPage title="Disputas de pagamentos." description="⚠️" icon="Pagamentos — Disputas" columns={COLUMNS} data={DATA} actions={[{label:"Resolver",variant:"primary"}]} />
}
