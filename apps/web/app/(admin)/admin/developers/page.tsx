"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"app",label:"Aplicação"},{key:"developer",label:"Developer"},{key:"apiKey",label:"API Key"},{key:"requests",label:"Req/dia"},{key:"estado",label:"Estado"}]
const DATA = [{app:"KS Mobile App",developer:"Equipa interna",apiKey:"ks_***...abc",requests:"45k",estado:"Activa"},{app:"OBS Plugin",developer:"Equipa interna",apiKey:"ks_***...def",requests:"12k",estado:"Activa"},{app:"Widget Chat",developer:"3rd party",apiKey:"ks_***...ghi",requests:"3k",estado:"Em teste"}]
export default function AdminDevelopersPage() {
  return <AdminPage title="Gestão de API e integrações." description="💻" icon="Developers" columns={COLUMNS} data={DATA} actions={[{label:"+ Gerar API Key",variant:"primary"}]} />
}
