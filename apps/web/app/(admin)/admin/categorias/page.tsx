"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"nome",label:"Categoria"},{key:"slug",label:"Slug"},{key:"streams",label:"Streams"},{key:"ordem",label:"Ordem"},{key:"estado",label:"Estado"}]
const DATA = [{nome:"Gaming",slug:"gaming",streams:"45",ordem:"1",estado:"Activa"},{nome:"Música",slug:"musica",streams:"32",ordem:"2",estado:"Activa"},{nome:"Futebol",slug:"futebol",streams:"18",ordem:"3",estado:"Activa"},{nome:"Just Talking",slug:"just-talking",streams:"28",ordem:"4",estado:"Activa"},{nome:"IRL Angola",slug:"irl",streams:"12",ordem:"5",estado:"Activa"},{nome:"Rádio",slug:"radio",streams:"8",ordem:"6",estado:"Activa"},{nome:"Negócios",slug:"negocios",streams:"5",ordem:"7",estado:"Activa"},{nome:"Criatividade",slug:"criatividade",streams:"6",ordem:"8",estado:"Activa"}]
export default function AdminCategoriasPage() {
  return <AdminPage title="Categorias" description="Gerir categorias de conteúdo." icon="🏷️" columns={COLUMNS} data={DATA} actions={[{label:"+ Nova Categoria",variant:"primary"}]} />
}
