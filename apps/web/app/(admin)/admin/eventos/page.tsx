"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Evento"},{key:"tipo",label:"Tipo"},{key:"data",label:"Data"},{key:"participantes",label:"Participantes"},{key:"premio",label:"Prémio"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"KS Gaming Cup #1",tipo:"Torneio",data:"05/04/2026",participantes:"32",premio:"50.000 Kz",estado:"Inscrições abertas"},{nome:"Creator Meet Luanda",tipo:"Meetup",data:"15/04/2026",participantes:"50",premio:"N/A",estado:"Agendado"},{nome:"Music Battle",tipo:"Competição",data:"20/04/2026",participantes:"16",premio:"25.000 Kz",estado:"Rascunho"}]
export default function AdminEventosPage() {
  return <AdminPage title="Gerir eventos e torneios." description="🎪" icon="Eventos" columns={COLUMNS} data={DATA} actions={[{label:"+ Novo evento",variant:"primary"}]} />
}
