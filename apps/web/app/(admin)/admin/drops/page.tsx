"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Drop"},{key:"tipo",label:"Tipo"},{key:"valor",label:"Valor"},{key:"condicao",label:"Condição"},{key:"claims",label:"Claims"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"Drop de boas-vindas",tipo:"Salos",valor:"50 Salos",condicao:"1º login",claims:"1.2k",estado:"Activo"},{nome:"Watch streak 7d",tipo:"Badge",valor:"Badge Gold",condicao:"7 dias seguidos",claims:"340",estado:"Activo"},{nome:"Creator milestone",tipo:"Salos",valor:"500 Salos",condicao:"100 followers",claims:"45",estado:"Activo"}]
export default function AdminDropsPage() {
  return <AdminPage title="Gerir sistema de drops e recompensas." description="🎁" icon="Drops" columns={COLUMNS} data={DATA} actions={[{label:"+ Novo drop",variant:"primary"}]} />
}
