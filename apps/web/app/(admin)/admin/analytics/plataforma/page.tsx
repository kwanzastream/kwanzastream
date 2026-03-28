"use client"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [{key:"metrica",label:"Métrica"},{key:"valor",label:"Valor"},{key:"estado",label:"Estado"}]
const DATA = [{metrica:"Uptime",valor:"99.8%",estado:"OK"},{metrica:"Latência média",valor:"45ms",estado:"OK"},{metrica:"Streams activas",valor:"24",estado:"Normal"},{metrica:"CPU servidor",valor:"32%",estado:"OK"},{metrica:"Memória",valor:"4.2GB / 8GB",estado:"OK"},{metrica:"Disco",valor:"120GB / 500GB",estado:"OK"}]

export default function AdminPlataformaPage() {
  return <AdminPage title="Analytics — Plataforma" description="Visão geral do estado da plataforma." icon="📊" columns={COLUMNS} data={DATA} actions={[{label:"Refresh",variant:"outline"}]} />
}