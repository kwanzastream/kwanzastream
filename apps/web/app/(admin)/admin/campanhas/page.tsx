"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Campanha"},{key:"tipo",label:"Tipo"},{key:"inicio",label:"Início"},{key:"fim",label:"Fim"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"Lançamento Beta",tipo:"Email",inicio:"01/03/2026",fim:"31/03/2026",estado:"Activa"},{nome:"Creator Week",tipo:"Social",inicio:"15/03/2026",fim:"22/03/2026",estado:"Concluída"},{nome:"Easter Special",tipo:"In-app",inicio:"01/04/2026",fim:"07/04/2026",estado:"Agendada"}]
export default function AdminCampanhasPage() {
  return <AdminPage title="Campanhas" description="Campanhas de marketing internas." icon="📣" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova",variant:"primary"}]} />
}
