"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"titulo",label:"Título"},{key:"criador",label:"Criador"},{key:"duracao",label:"Duração"},{key:"views",label:"Views"},{key:"likes",label:"Likes"},{key:"estado",label:"Estado"}]
const DATA = [{titulo:"Luanda à noite",criador:"StreetAO",duracao:"15s",views:"12k",likes:"890",estado:"Publicado"},{titulo:"Tutorial OBS",criador:"TechAO",duracao:"30s",views:"3.2k",likes:"245",estado:"Publicado"},{titulo:"Dance challenge",criador:"DancerAO",duracao:"20s",views:"8.5k",likes:"1.2k",estado:"Publicado"}]
export default function AdminConteudoShortsPage() {
  return <AdminPage title="Gerir shorts da plataforma." description="📱" icon="Conteúdo — Shorts" columns={COLUMNS} data={DATA} actions={[{label:"Moderar fila",variant:"primary"}]} />
}
