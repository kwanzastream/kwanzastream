"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"creator",label:"Creator"},{key:"valor",label:"Valor"},{key:"metodo",label:"Método"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#W-089",creator:"GamerAO",valor:"25.000 Kz",metodo:"Multicaixa",data:"27/03/2026",estado:"Pendente"},{id:"#W-088",creator:"DJ Kiala",valor:"45.000 Kz",metodo:"Transf. Bancária",data:"26/03/2026",estado:"Processado"},{id:"#W-087",creator:"FutebolAO",valor:"12.500 Kz",metodo:"E-Kwanza",data:"25/03/2026",estado:"Pago"}]
export default function AdminLevantamentosPage() {
  return <AdminPage title="Pedidos de levantamento de creators." description="💸" icon="Pagamentos — Levantamentos" columns={COLUMNS} data={DATA} actions={[{label:"Processar fila",variant:"primary"}]} />
}
