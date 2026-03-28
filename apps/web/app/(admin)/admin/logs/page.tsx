"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"timestamp",label:"Timestamp"},{key:"nivel",label:"Nível"},{key:"servico",label:"Serviço"},{key:"mensagem",label:"Mensagem"},{key:"user",label:"Utilizador"}]
const DATA = [{timestamp:"14:32:05",nivel:"INFO",servico:"Auth",mensagem:"Login bem-sucedido",user:"streamer42"},{timestamp:"14:31:58",nivel:"WARN",servico:"Stream",mensagem:"Bitrate alto detectado",user:"gamer99"},{timestamp:"14:31:45",nivel:"ERROR",servico:"Payment",mensagem:"Timeout Multicaixa",user:"system"},{timestamp:"14:31:30",nivel:"INFO",servico:"Chat",mensagem:"Mensagem moderada",user:"bot"}]
export default function AdminLogsPage() {
  return <AdminPage title="Logs do sistema e auditoria." description="📋" icon="Logs" columns={COLUMNS} data={DATA} actions={[{label:"Exportar logs",variant:"outline"}]} />
}
