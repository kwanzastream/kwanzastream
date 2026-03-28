"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"id",label:"ID"},{key:"tipo",label:"Tipo"},{key:"de",label:"De"},{key:"para",label:"Para"},{key:"valor",label:"Valor"},{key:"data",label:"Data"},{key:"estado",label:"Estado"}]
const DATA = [{id:"#T-4521",tipo:"Salo",de:"viewer1",para:"GamerAO",valor:"500 Kz",data:"27/03 14:32",estado:"OK"},{id:"#T-4520",tipo:"Subscrição",de:"viewer2",para:"DJ Kiala",valor:"1.500 Kz",data:"27/03 14:28",estado:"OK"},{id:"#T-4519",tipo:"Depósito",de:"viewer3",para:"Wallet",valor:"5.000 Kz",data:"27/03 14:15",estado:"OK"}]
export default function AdminTransaccoesPage() {
  return <AdminPage title="Todas as transacções da plataforma." description="💳" icon="Pagamentos — Transacções" columns={COLUMNS} data={DATA} actions={[{label:"Exportar CSV",variant:"outline"}]} />
}
