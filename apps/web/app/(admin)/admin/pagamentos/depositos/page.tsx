"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"user",label:"Utilizador"},{key:"valor",label:"Valor"},{key:"metodo",label:"Método"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#D-301",user:"viewer1",valor:"2.500 Kz",metodo:"Multicaixa",data:"27/03/2026",estado:"Confirmado"},{id:"#D-300",user:"viewer2",valor:"5.000 Kz",metodo:"E-Kwanza",data:"27/03/2026",estado:"Pendente"},{id:"#D-299",user:"viewer3",valor:"1.000 Kz",metodo:"Unitel Money",data:"26/03/2026",estado:"Confirmado"}]
export default function AdminDepositosPage() {
  return <AdminPage title="Depósitos de utilizadores." description="💰" icon="Pagamentos — Depósitos" columns={COLUMNS} data={DATA} actions={[{label:"Exportar",variant:"outline"}]} />
}
