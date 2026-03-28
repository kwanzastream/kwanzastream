"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"reporter",label:"Reportado por"},{key:"alvo",label:"Alvo"},{key:"tipo",label:"Tipo"},{key:"razao",label:"Razão"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#R-201",reporter:"viewer1",alvo:"streamer_x",tipo:"Stream",razao:"Conteúdo inapropriado",data:"26/03/2026",estado:"Pendente"},{id:"#R-200",reporter:"viewer2",alvo:"chatter_y",tipo:"Chat",razao:"Assédio",data:"26/03/2026",estado:"Em revisão"},{id:"#R-199",reporter:"streamer3",alvo:"viewer_z",tipo:"Perfil",razao:"Impersonation",data:"25/03/2026",estado:"Resolvido"}]
export default function AdminModeracaoReportsPage() {
  return <AdminPage title="Denúncias de utilizadores." description="🚩" icon="Moderação — Reports" columns={COLUMNS} data={DATA} actions={[{label:"Moderar fila",variant:"primary"}]} />
}
