"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"username",label:"Username"},{key:"nome",label:"Nome"},{key:"seguidores",label:"Seguidores"},{key:"streamHoras",label:"Horas Stream"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{username:"newstreamer1",nome:"Carlos Silva",seguidores:"120",streamHoras:"45h",data:"26/03/2026",estado:"Pendente"},{username:"newstreamer2",nome:"Ana Costa",seguidores:"250",streamHoras:"80h",data:"25/03/2026",estado:"Pendente"},{username:"newstreamer3",nome:"Miguel Santos",seguidores:"89",streamHoras:"30h",data:"24/03/2026",estado:"Rejeitada"}]
export default function AdminCandidaturasAfiliadoPage() {
  return <AdminPage title="Candidaturas ao programa de afiliados." description="🤝" icon="Candidaturas Afiliado" columns={COLUMNS} data={DATA} actions={[{label:"Aprovar seleccionados",variant:"primary"}]} />
}
