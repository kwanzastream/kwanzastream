"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Tribo"},{key:"lider",label:"Líder"},{key:"membros",label:"Membros"},{key:"streams",label:"Streams/sem"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"Gaming Angola",lider:"GamerAO",membros:"125",streams:"15",estado:"Activa"},{nome:"Kuduro Nation",lider:"DJ Kiala",membros:"80",streams:"8",estado:"Activa"},{nome:"Futebol AO",lider:"FutebolFan",membros:"95",streams:"12",estado:"Activa"},{nome:"Tech Angola",lider:"TechBro",membros:"45",streams:"5",estado:"Activa"}]
export default function AdminTribosPage() {
  return <AdminPage title="Comunidades e grupos de creators." description="👥" icon="Tribos" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova tribo",variant:"primary"}]} />
}
