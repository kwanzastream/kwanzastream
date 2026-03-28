"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"tipo",label:"Tipo"},{key:"total",label:"Total"},{key:"pendentes",label:"Pendentes"},{key:"reportados",label:"Reportados"},{key:"estado",label:"Estado"}]
const DATA = [{tipo:"Streams (ao vivo)",total:"24",pendentes:"0",reportados:"1",estado:"Normal"},{tipo:"VODs",total:"1.250",pendentes:"12",reportados:"3",estado:"Normal"},{tipo:"Clips",total:"3.400",pendentes:"5",reportados:"8",estado:"Normal"},{tipo:"Shorts",total:"890",pendentes:"25",reportados:"2",estado:"Normal"}]
export default function AdminConteudoPage() {
  return <AdminPage title="Visão geral de todo o conteúdo." description="📹" icon="Conteúdo" columns={COLUMNS} data={DATA} actions={[{label:"Moderar fila",variant:"primary"}]} />
}
