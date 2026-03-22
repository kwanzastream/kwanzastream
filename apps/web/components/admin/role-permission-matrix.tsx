"use client"
const ROLES = ['super_admin', 'admin', 'moderator', 'finance', 'support'] as const
const SECTIONS = ['Dashboard', 'Utilizadores', 'Streamers', 'Streams', 'Conteúdo', 'Moderação', 'Pagamentos', 'Analytics', 'Categorias', 'Comércio', 'Feature Flags', 'Config', 'Logs', 'Admins']
const MATRIX: Record<string, Record<string, string>> = {
  Dashboard: { super_admin: "✅", admin: "✅", moderator: "👁", finance: "👁", support: "👁" },
  Utilizadores: { super_admin: "✅", admin: "✅", moderator: "👁", finance: "✗", support: "👁" },
  Streamers: { super_admin: "✅", admin: "✅", moderator: "✗", finance: "✗", support: "✗" },
  Streams: { super_admin: "✅", admin: "✅", moderator: "✅", finance: "✗", support: "✗" },
  Conteúdo: { super_admin: "✅", admin: "✅", moderator: "✅", finance: "✗", support: "✗" },
  Moderação: { super_admin: "✅", admin: "✅", moderator: "✅", finance: "✗", support: "👁" },
  Pagamentos: { super_admin: "✅", admin: "✅", moderator: "✗", finance: "✅", support: "✗" },
  Analytics: { super_admin: "✅", admin: "✅", moderator: "✗", finance: "👁", support: "✗" },
  Categorias: { super_admin: "✅", admin: "✅", moderator: "✗", finance: "✗", support: "✗" },
  Comércio: { super_admin: "✅", admin: "✅", moderator: "✗", finance: "✗", support: "✗" },
  "Feature Flags": { super_admin: "✅", admin: "✗", moderator: "✗", finance: "✗", support: "✗" },
  Config: { super_admin: "✅", admin: "✗", moderator: "✗", finance: "✗", support: "✗" },
  Logs: { super_admin: "✅", admin: "✅", moderator: "👁", finance: "👁", support: "👁" },
  Admins: { super_admin: "✅", admin: "✗", moderator: "✗", finance: "✗", support: "✗" },
}
export function RolePermissionMatrix() {
  return (<div className="overflow-x-auto rounded-xl border border-white/10"><table className="w-full text-[10px]">
    <thead><tr className="border-b border-white/5"><th className="px-3 py-2 text-left">Secção</th>{ROLES.map(r => <th key={r} className="px-2 py-2 text-center">{r}</th>)}</tr></thead>
    <tbody>{SECTIONS.map(s => <tr key={s} className="border-b border-white/5"><td className="px-3 py-1.5 font-medium">{s}</td>{ROLES.map(r => <td key={r} className="px-2 py-1.5 text-center">{MATRIX[s]?.[r] || "✗"}</td>)}</tr>)}</tbody>
  </table></div>)
}
