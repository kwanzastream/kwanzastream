"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"reclamante",label:"Reclamante"},{key:"conteudo",label:"Conteúdo"},{key:"criador",label:"Criador"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#C-014",reclamante:"Universal Music",conteudo:"VOD #892",criador:"DJ_Mix",data:"23/03/2026",estado:"Pendente"},{id:"#C-013",reclamante:"Angolano Records",conteudo:"Clip #456",criador:"MusicFan",data:"22/03/2026",estado:"Aceite"}]
export default function AdminModeracaoCopyrightPage() {
  return <AdminPage title="Claims de violação de direitos de autor." description="©️" icon="Moderação — Copyright" columns={COLUMNS} data={DATA} actions={[{label:"Processar claims",variant:"primary"}]} />
}
