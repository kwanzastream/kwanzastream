"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"param",label:"Parâmetro"},{key:"valor",label:"Valor"},{key:"estado",label:"Estado"}]
const DATA = [{param:"RTMP Server",valor:"rtmp://live.kwanzastream.ao",estado:"Online"},{param:"Max Bitrate",valor:"6000 kbps",estado:"OK"},{param:"Max Resolução",valor:"1080p 60fps",estado:"OK"},{param:"Codec",valor:"H.264 / AAC",estado:"OK"},{param:"HLS Segments",valor:"3s",estado:"OK"},{param:"Transcoders activos",valor:"2/4",estado:"Normal"}]
export default function AdminConfigStreamingPage() {
  return <AdminPage title="Definições de infraestrutura de streaming." description="📡" icon="Configuração — Streaming" columns={COLUMNS} data={DATA} actions={[{label:"Restart transcoders",variant:"outline"}]} />
}
