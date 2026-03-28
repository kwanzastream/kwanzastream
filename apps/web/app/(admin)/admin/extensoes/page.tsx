"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Extensão"},{key:"developer",label:"Developer"},{key:"versao",label:"Versão"},{key:"instalacoes",label:"Instalações"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"Chat Overlay",developer:"KS Team",versao:"1.2.0",instalacoes:"890",estado:"Aprovada"},{nome:"Poll Widget",developer:"KS Team",versao:"1.0.1",instalacoes:"450",estado:"Aprovada"},{nome:"Alerts Box",developer:"Community",versao:"0.9.0",instalacoes:"120",estado:"Em revisão"}]
export default function AdminExtensoesPage() {
  return <AdminPage title="Gerir extensões e plugins." description="🧩" icon="Extensões" columns={COLUMNS} data={DATA} actions={[{label:"+ Submeter extensão",variant:"primary"}]} />
}
