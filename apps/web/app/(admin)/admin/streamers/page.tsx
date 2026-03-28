"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"username",label:"Username"},{key:"nome",label:"Nome"},{key:"seguidores",label:"Seguidores"},{key:"streams",label:"Streams"},{key:"receita",label:"Receita Total"},{key:"tier",label:"Tier"},{key:"estado",label:"Estado"}]
const DATA = [{username:"GamerAO",nome:"João Gamer",seguidores:"12.5k",streams:"245",receita:"450k Kz",tier:"Partner",estado:"Activo"},{username:"DJ_Kiala",nome:"Ana Kiala",seguidores:"8.2k",streams:"120",receita:"320k Kz",tier:"Partner",estado:"Activo"},{username:"FutebolAO",nome:"Pedro Futebol",seguidores:"5.1k",streams:"89",receita:"180k Kz",tier:"Afiliado",estado:"Activo"}]
export default function AdminStreamersPage() {
  return <AdminPage title="Gerir criadores de conteúdo." description="🎙️" icon="Streamers" columns={COLUMNS} data={DATA} actions={[{label:"Exportar",variant:"outline"}]} />
}
