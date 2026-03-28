"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"param",label:"Parâmetro"},{key:"valor",label:"Valor Actual"},{key:"tipo",label:"Tipo"}]
const DATA = [{param:"Nome da plataforma",valor:"Kwanza Stream",tipo:"Texto"},{param:"Modo manutenção",valor:"Desactivado",tipo:"Toggle"},{param:"Registo aberto",valor:"Sim",tipo:"Toggle"},{param:"Max upload (MB)",valor:"100",tipo:"Número"},{param:"Duração máx. stream (h)",valor:"12",tipo:"Número"},{param:"Língua padrão",valor:"pt-AO",tipo:"Selecção"}]
export default function AdminConfigPlataformaPage() {
  return <AdminPage title="Definições gerais da plataforma." description="⚙️" icon="Configuração — Plataforma" columns={COLUMNS} data={DATA} actions={[{label:"Guardar alterações",variant:"primary"}]} />
}
