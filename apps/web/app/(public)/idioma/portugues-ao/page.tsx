"use client"
export default function PortuguesAOPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-xl font-bold">🇦🇴 Português de Angola</h1><p className="text-sm">O Português angolano é o idioma oficial e principal da plataforma. Distinto do Português europeu em vocabulário, pronúncia e expressões. Todo o interface, documentação e suporte do Kwanza Stream é em PT-AO.</p>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">Expressões angolanas comuns no chat:</h2>
    {[["Bué", "Muito / bastante"], ["Kota", "Pessoa mais velha / líder"], ["Bazar", "Ir embora"], ["Mambo", "Situação / problema"], ["Fixe", "Bom / legal"]].map(([w,d]) => <p key={w} className="text-xs text-muted-foreground"><strong className="text-foreground">{w}</strong> — {d}</p>)}</div>
</div>) }
