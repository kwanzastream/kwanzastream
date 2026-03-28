"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"param",label:"Parâmetro"},{key:"valor",label:"Valor"},{key:"estado",label:"Estado"}]
const DATA = [{param:"SMTP Host",valor:"smtp.resend.com",estado:"Configurado"},{param:"From Email",valor:"noreply@kwanzastream.ao",estado:"Configurado"},{param:"API Key",valor:"re_***...kj2",estado:"Activa"},{param:"Rate Limit",valor:"100/hora",estado:"OK"},{param:"Templates",valor:"5 activos",estado:"OK"}]
export default function AdminConfigEmailPage() {
  return <AdminPage title="Definições de envio de email." description="📧" icon="Configuração — Email" columns={COLUMNS} data={DATA} actions={[{label:"Testar envio",variant:"primary"}]} />
}
