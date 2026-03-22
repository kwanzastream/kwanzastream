"use client"
import { RolePermissionMatrix } from "@/components/admin/role-permission-matrix"
export default function AdminRolesPage() { return (<div className="space-y-4"><h1 className="text-xl font-bold">Roles & Permissões</h1><p className="text-xs text-muted-foreground">✅ = acesso total · 👁 = leitura · ✗ = sem acesso</p><RolePermissionMatrix /></div>) }
