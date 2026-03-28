"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"username",label:"Username"},{key:"nome",label:"Nome"},{key:"seguidores",label:"Seguidores"},{key:"receita",label:"Receita 90d"},{key:"streamHoras",label:"Horas 90d"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{username:"streamer_pro",nome:"David Pro",seguidores:"5.2k",receita:"180k Kz",streamHoras:"200h",data:"25/03/2026",estado:"Pendente"},{username:"music_star",nome:"Rita Musical",seguidores:"3.8k",receita:"120k Kz",streamHoras:"150h",data:"23/03/2026",estado:"Em revisão"}]
export default function AdminCandidaturasPartnerPage() {
  return <AdminPage title="Candidaturas ao programa Partner." description="⭐" icon="Candidaturas Partner" columns={COLUMNS} data={DATA} actions={[{label:"Aprovar seleccionados",variant:"primary"}]} />
}
