"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"titulo",label:"Título"},{key:"streamer",label:"Streamer"},{key:"duracao",label:"Duração"},{key:"views",label:"Views"},{key:"tamanho",label:"Tamanho"},{key:"estado",label:"Estado"}]
const DATA = [{titulo:"CS2 Ranked Session",streamer:"GamerAO",duracao:"3h 25m",views:"450",tamanho:"2.1 GB",estado:"Publicado"},{titulo:"Live Kuduro Mix",streamer:"DJ Kiala",duracao:"2h 10m",views:"1.2k",tamanho:"1.4 GB",estado:"Publicado"},{titulo:"Análise Girabola",streamer:"FutebolAO",duracao:"1h 45m",views:"890",tamanho:"980 MB",estado:"Publicado"}]
export default function AdminConteudoVodsPage() {
  return <AdminPage title="Gerir VODs gravados." description="🎥" icon="Conteúdo — VODs" columns={COLUMNS} data={DATA} actions={[{label:"Gerir storage",variant:"outline"}]} />
}
