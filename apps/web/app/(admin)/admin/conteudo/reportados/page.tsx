"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"conteudo",label:"Conteúdo"},{key:"tipo",label:"Tipo"},{key:"reports",label:"Reports"},{key:"razao",label:"Razão"},{key:"criador",label:"Criador"},{key:"estado",label:"Estado"}]
const DATA = [{conteudo:"Stream #482",tipo:"Stream",reports:"3",razao:"Conteúdo inapropriado",criador:"user123",estado:"Pendente"},{conteudo:"Clip #1290",tipo:"Clip",reports:"5",razao:"Copyright",criador:"user456",estado:"Pendente"},{conteudo:"VOD #892",tipo:"VOD",reports:"2",razao:"Spam",criador:"user789",estado:"Em revisão"}]
export default function AdminConteudoReportadosPage() {
  return <AdminPage title="Conteúdo reportado por utilizadores." description="🚨" icon="Conteúdo — Reportados" columns={COLUMNS} data={DATA} actions={[{label:"Resolver todos",variant:"primary"}]} />
}
