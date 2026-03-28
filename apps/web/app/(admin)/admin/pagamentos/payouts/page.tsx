"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"creator",label:"Creator"},{key:"valor",label:"Valor Bruto"},{key:"comissao",label:"Comissão KS"},{key:"liquido",label:"Líquido"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#PO-45",creator:"GamerAO",valor:"100.000 Kz",comissao:"20.000 Kz",liquido:"80.000 Kz",estado:"Pago"},{id:"#PO-44",creator:"DJ Kiala",valor:"75.000 Kz",comissao:"15.000 Kz",liquido:"60.000 Kz",estado:"Pago"}]
export default function AdminPayoutsPage() {
  return <AdminPage title="Payouts automáticos a creators." description="🏦" icon="Pagamentos — Payouts" columns={COLUMNS} data={DATA} actions={[{label:"Exportar",variant:"outline"}]} />
}
