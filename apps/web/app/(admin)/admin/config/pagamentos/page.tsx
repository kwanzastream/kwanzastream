"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"metodo",label:"Método"},{key:"provider",label:"Provider"},{key:"comissao",label:"Comissão"},{key:"estado",label:"Estado"}]
const DATA = [{metodo:"Multicaixa Express",provider:"EMIS",comissao:"2.5%",estado:"Activo"},{metodo:"Transferência Bancária",provider:"BAI",comissao:"1.0%",estado:"Activo"},{metodo:"E-Kwanza",provider:"E-Kwanza",comissao:"1.5%",estado:"Em teste"},{metodo:"Unitel Money",provider:"Unitel",comissao:"2.0%",estado:"Desactivo"}]
export default function AdminConfigPagamentosPage() {
  return <AdminPage title="Métodos de pagamento e comissões." description="💳" icon="Configuração — Pagamentos" columns={COLUMNS} data={DATA} actions={[{label:"Guardar",variant:"primary"}]} />
}
