"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"relatorio",label:"Relatório"},{key:"periodo",label:"Período"},{key:"receita",label:"Receita"},{key:"comissoes",label:"Comissões"},{key:"payouts",label:"Payouts"},{key:"data",label:"Gerado"}]
const DATA = [{relatorio:"Março 2026",periodo:"01-27/03",receita:"2.5M Kz",comissoes:"500k Kz",payouts:"2M Kz",data:"27/03/2026"},{relatorio:"Fevereiro 2026",periodo:"01-28/02",receita:"1.8M Kz",comissoes:"360k Kz",payouts:"1.44M Kz",data:"01/03/2026"}]
export default function AdminRelatoriosPage() {
  return <AdminPage title="Relatórios financeiros da plataforma." description="📊" icon="Pagamentos — Relatórios" columns={COLUMNS} data={DATA} actions={[{label:"Gerar relatório",variant:"primary"}]} />
}
