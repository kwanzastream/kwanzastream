"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"user",label:"Utilizador"},{key:"razao",label:"Razão"},{key:"tipo",label:"Tipo"},{key:"data",label:"Data"},{key:"expira",label:"Expira"},{key:"admin",label:"Banido por"}]
const DATA = [{user:"troll_account",razao:"Spam repetido",tipo:"Permanente",data:"20/03/2026",expira:"Nunca",admin:"João Admin"},{user:"fake_streamer",razao:"Fraude de Salos",tipo:"Permanente",data:"18/03/2026",expira:"Nunca",admin:"Maria Silva"},{user:"toxic_chatter",razao:"Hate speech",tipo:"Temporário",data:"25/03/2026",expira:"01/04/2026",admin:"Pedro Santos"}]
export default function AdminModeracaoBansPage() {
  return <AdminPage title="Utilizadores banidos da plataforma." description="🔨" icon="Moderação — Bans" columns={COLUMNS} data={DATA} actions={[{label:"+ Banir utilizador",variant:"primary"}]} />
}
