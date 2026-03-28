"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"titulo",label:"Título"},{key:"criador",label:"Criador"},{key:"stream",label:"Stream"},{key:"duracao",label:"Duração"},{key:"views",label:"Views"},{key:"estado",label:"Estado"}]
const DATA = [{titulo:"Ace clutch CS2",criador:"GamerAO",stream:"CS2 Ranked",duracao:"30s",views:"2.1k",estado:"Publicado"},{titulo:"Golo do Girabola",criador:"FutebolAO",stream:"Petro vs 1º Ago",duracao:"15s",views:"5.3k",estado:"Publicado"},{titulo:"Beat drop kuduro",criador:"DJ Kiala",stream:"Mix ao vivo",duracao:"45s",views:"890",estado:"Em revisão"}]
export default function AdminConteudoClipsPage() {
  return <AdminPage title="Gerir clips da plataforma." description="🎬" icon="Conteúdo — Clips" columns={COLUMNS} data={DATA} actions={[{label:"Moderar",variant:"primary"}]} />
}
