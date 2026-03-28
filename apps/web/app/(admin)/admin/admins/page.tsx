"use client"
import { AdminPage } from "@/components/admin-page"

const COLUMNS = [{key:"name",label:"Nome"},{key:"email",label:"Email"},{key:"role",label:"Cargo"},{key:"lastLogin",label:"Último Login"},{key:"status",label:"Estado"}]
const DATA = [{name:"João Admin",email:"joao@ks.ao",role:"Super Admin",lastLogin:"Hoje, 14:30",status:"Activo"},{name:"Maria Silva",email:"maria@ks.ao",role:"Admin",lastLogin:"Ontem",status:"Activo"},{name:"Pedro Santos",email:"pedro@ks.ao",role:"Moderador",lastLogin:"Há 3 dias",status:"Activo"}]

export default function AdminAdminsPage() {
  return <AdminPage title="Gestão de Admins" description="Gerir administradores da plataforma." icon="👑" columns={COLUMNS} data={DATA} actions={[{label:"+ Adicionar Admin",variant:"primary"}]} />
}