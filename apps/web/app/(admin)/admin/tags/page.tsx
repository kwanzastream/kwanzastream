"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"tag",label:"Tag"},{key:"usos",label:"Usos"},{key:"streams",label:"Streams"},{key:"estado",label:"Estado"}]
const DATA = [{tag:"gaming",usos:"2.3k",streams:"45",estado:"Activa"},{tag:"musica",usos:"1.8k",streams:"32",estado:"Activa"},{tag:"futebol",usos:"950",streams:"18",estado:"Activa"},{tag:"angola",usos:"3.1k",streams:"60",estado:"Activa"},{tag:"kuduro",usos:"450",streams:"8",estado:"Activa"},{tag:"cs2",usos:"680",streams:"15",estado:"Activa"}]
export default function AdminTagsPage() {
  return <AdminPage title="Gerir tags de conteúdo." description="🏷️" icon="Tags" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova tag",variant:"primary"}]} />
}
