"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"produto",label:"Produto"},{key:"preco",label:"Preço"},{key:"stock",label:"Stock"},{key:"vendas",label:"Vendas"},{key:"estado",label:"Estado"}]
const DATA = [{produto:"T-shirt KS Preta",preco:"3.500 Kz",stock:"150",vendas:"45",estado:"Disponível"},{produto:"Hoodie KS",preco:"7.000 Kz",stock:"80",vendas:"22",estado:"Disponível"},{produto:"Boné KS",preco:"2.000 Kz",stock:"0",vendas:"120",estado:"Esgotado"}]
export default function AdminLojaPage() {
  return <AdminPage title="Gerir loja de merchandise." description="🛒" icon="Loja" columns={COLUMNS} data={DATA} actions={[{label:"+ Novo produto",variant:"primary"}]} />
}
