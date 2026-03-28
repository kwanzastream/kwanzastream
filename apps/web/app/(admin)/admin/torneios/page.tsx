"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Torneio"},{key:"jogo",label:"Jogo"},{key:"participantes",label:"Participantes"},{key:"premio",label:"Prémio"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"KS Cup CS2 #1",jogo:"CS2",participantes:"32/32",premio:"50.000 Kz",data:"05/04/2026",estado:"Inscrições abertas"},{nome:"FIFA 26 Challenge",jogo:"FIFA 26",participantes:"16/16",premio:"25.000 Kz",data:"12/04/2026",estado:"Agendado"},{nome:"Free Fire Battle",jogo:"Free Fire",participantes:"8/24",premio:"15.000 Kz",data:"20/04/2026",estado:"Inscrições abertas"}]
export default function AdminTorneiosPage() {
  return <AdminPage title="Gerir torneios e competições." description="🏆" icon="Torneios" columns={COLUMNS} data={DATA} actions={[{label:"+ Novo torneio",variant:"primary"}]} />
}
