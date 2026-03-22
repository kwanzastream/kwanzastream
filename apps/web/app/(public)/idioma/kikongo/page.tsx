"use client"
export default function KikongoPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">🗣️ Kikongo</h1>
  <p className="text-sm">O Kikongo é falado no norte de Angola — províncias do Zaire, Uíge e Cabinda. Também é falado na República do Congo e RDC. Estima-se que 4-5 milhões de angolanos falam Kikongo.</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">Frases úteis:</h2>
    {[["Mbote", "Olá"], ["Luvingu", "Bem-vindo"], ["Nkufi", "Obrigado"], ["Wiza", "Vem"]].map(([k,p]) => <p key={k} className="text-xs text-muted-foreground"><strong className="text-foreground">{k}</strong> — {p}</p>)}</div>
  <p className="text-xs text-muted-foreground">Criadores que transmitem em Kikongo podem ser filtrados na secção de idiomas.</p>
</div>) }
