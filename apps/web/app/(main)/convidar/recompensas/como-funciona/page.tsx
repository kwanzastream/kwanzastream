export default function ComoFuncionaPage() {
  const steps = [
    { n: "1", t: "Copia o teu link único" },
    { n: "2", t: "Partilha com amigos no WhatsApp" },
    { n: "3", t: "O amigo regista-se usando o teu link" },
    { n: "4", t: "Ambos recebem Salos automaticamente" },
  ]
  const rules = [
    "Cada link é único e pessoal",
    "Só contas novas (nunca registadas) contam",
    "O amigo deve usar o link durante o registo",
    "Recompensas creditadas após primeiro login do amigo",
    "Máximo de recompensas: 100 amigos por conta",
    "Contas criadas para fazer batota serão anuladas",
  ]
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-lg font-bold">Como funcionam os convites</h1>
      <div className="space-y-3">{steps.map(s => <div key={s.n} className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] shrink-0">{s.n}</div><p className="text-xs pt-0.5">{s.t}</p></div>)}</div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-xs font-semibold mb-2">Regras:</p><ul className="space-y-1">{rules.map((r, i) => <li key={i} className="text-[10px] text-muted-foreground">→ {r}</li>)}</ul></div>
    </div>
  )
}
