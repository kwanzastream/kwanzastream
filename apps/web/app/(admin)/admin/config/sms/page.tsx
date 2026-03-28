"use client"
import { AdminPage } from "@/components/admin-page"
const COLUMNS = [{key:"param",label:"Parâmetro"},{key:"valor",label:"Valor"},{key:"estado",label:"Estado"}]
const DATA = [{param:"Provider",valor:"Africa is Talking",estado:"Configurado"},{param:"Sender ID",valor:"KwanzaStr",estado:"Aprovado"},{param:"OTP Expiração",valor:"5 min",estado:"OK"},{param:"Rate Limit",valor:"3 SMS/hora/user",estado:"OK"},{param:"SMS enviados hoje",valor:"128",estado:"Normal"}]
export default function AdminConfigSMSPage() {
  return <AdminPage title="Definições de envio de SMS/OTP." description="📱" icon="Configuração — SMS" columns={COLUMNS} data={DATA} actions={[{label:"Testar SMS",variant:"primary"}]} />
}
