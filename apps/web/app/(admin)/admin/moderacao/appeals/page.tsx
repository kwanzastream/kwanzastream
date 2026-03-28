"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"user",label:"Utilizador"},{key:"tipo",label:"Tipo"},{key:"razao",label:"Razão do appeal"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#A-001",user:"streamer42",tipo:"Ban",razao:"Falso positivo no filtro de chat",data:"25/03/2026",estado:"Pendente"},{id:"#A-002",user:"viewer99",tipo:"Mute",razao:"Contexto mal interpretado",data:"24/03/2026",estado:"Em revisão"}]
export default function AdminModeracaoAppealsPage() {
  return <AdminPage title="Revisão de recursos de utilizadores." description="⚖️" icon="Moderação — Appeals" columns={COLUMNS} data={DATA} actions={[{label:"Resolver",variant:"primary"}]} />
}
