"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"campanha",label:"Campanha"},{key:"anunciante",label:"Anunciante"},{key:"formato",label:"Formato"},{key:"impressoes",label:"Impressões"},{key:"estado",label:"Estado"}]
const DATA = [{campanha:"Unitel Verão",anunciante:"Unitel",formato:"Pre-roll",impressoes:"12.5k",estado:"Activa"},{campanha:"BAI Directo",anunciante:"BAI",formato:"Banner",impressoes:"8.2k",estado:"Activa"},{campanha:"Coca-Cola AO",anunciante:"Coca-Cola",formato:"Sponsored",impressoes:"25k",estado:"Pausada"}]
export default function AdminAnunciosPage() {
  return <AdminPage title="Anúncios" description="Gerir campanhas publicitárias." icon="📢" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova Campanha",variant:"primary"}]} />
}
