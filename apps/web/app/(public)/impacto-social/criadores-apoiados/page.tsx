"use client"
export default function CriadoresApoiadosPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">Criadores Apoiados</h1>
  <p className="text-sm text-muted-foreground">234 criadores apoiados pelo Creator Fund e programas da plataforma</p>
  <div className="space-y-3">
    {[{ u: "@voz-angola", p: "Luanda", cat: "Gaming", quote: "O Kwanza Stream deu-me um público que nunca teria alcançado de outra forma." },
      { u: "@semba-master", p: "Huambo", cat: "Música", quote: "O Kwanza Stream permitiu-me alcançar jovens em todo o Planalto Central." },
      { u: "@chef-angola", p: "Benguela", cat: "Culinária", quote: "Consegui monetizar as minhas receitas angolanas e alcançar a diáspora." },
    ].map(c => (
      <div key={c.u} className="p-4 rounded-xl border border-white/10 space-y-1">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{c.u[1].toUpperCase()}</div>
          <div><p className="text-sm font-semibold">{c.u}</p><p className="text-[10px] text-muted-foreground">{c.p} · {c.cat}</p></div></div>
        <p className="text-xs text-muted-foreground italic">&ldquo;{c.quote}&rdquo;</p>
      </div>
    ))}
  </div></div>) }
