"use client"

interface Scope { scope: string; desc: string }

export function ScopeTable({ scopes }: { scopes: Scope[] }) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <table className="w-full text-xs">
        <thead><tr className="bg-white/5"><th className="px-3 py-2 text-left font-medium">Scope</th><th className="px-3 py-2 text-left font-medium">Descrição</th></tr></thead>
        <tbody>
          {scopes.map(s => (
            <tr key={s.scope} className="border-t border-white/5">
              <td className="px-3 py-2 font-mono text-primary text-[10px]">{s.scope}</td>
              <td className="px-3 py-2 text-muted-foreground">{s.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
