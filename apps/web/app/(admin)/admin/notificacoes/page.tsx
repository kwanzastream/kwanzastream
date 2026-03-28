"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"titulo",label:"Título"},{key:"tipo",label:"Tipo"},{key:"destinatarios",label:"Destinatários"},{key:"enviada",label:"Envio"},{key:"aberturas",label:"Aberturas"},{key:"estado",label:"Estado"}]
const DATA = [{titulo:"Bem-vindo ao KS!",tipo:"Push",destinatarios:"Novos users",enviada:"Automático",aberturas:"78%",estado:"Activa"},{titulo:"Nova funcionalidade: Clips",tipo:"Email",destinatarios:"Todos",enviada:"25/03/2026",aberturas:"45%",estado:"Enviada"},{titulo:"Manutenção agendada",tipo:"Banner",destinatarios:"Todos",enviada:"27/03/2026",aberturas:"92%",estado:"Activa"}]
export default function AdminNotificacoesPage() {
  return <AdminPage title="Gerir notificações da plataforma." description="🔔" icon="Notificações" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova notificação",variant:"primary"}]} />
}
