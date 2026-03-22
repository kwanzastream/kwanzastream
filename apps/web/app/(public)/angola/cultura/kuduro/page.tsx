"use client"
export default function KuduroPage() { return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
  <span className="text-4xl">🎵</span><h1 className="text-2xl font-bold">Kuduro no Kwanza Stream</h1>
  <p className="text-sm">O Kuduro é mais do que música — é identidade angolana. Nasceu em Luanda nos anos 80, misturando batidas electrónicas com dança africana, e conquistou o mundo.</p>
  <div className="grid grid-cols-3 gap-3">
    <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">12</p><p className="text-[9px] text-muted-foreground">Streams ao vivo</p></div>
    <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">45</p><p className="text-[9px] text-muted-foreground">Criadores</p></div>
    <div className="p-3 rounded-xl border border-white/10 text-center"><p className="text-lg font-bold">234</p><p className="text-[9px] text-muted-foreground">Clips esta semana</p></div>
  </div>
  <div className="p-4 rounded-xl border border-white/10 space-y-2"><h2 className="text-sm font-semibold">História do Kuduro</h2>
    <p className="text-xs text-muted-foreground">Surgiu nos musseques de Luanda na década de 1980. Tony Amado, DJ Znobia e Os Lambas foram pioneiros. O nome vem da expressão "ku duro" — dançar com o rabo duro. Hoje, artistas como Burna Boy e J Balvin citam o Kuduro como influência.</p></div>
  <div className="space-y-2"><h2 className="text-sm font-semibold">Top Criadores de Kuduro</h2>
    {["kuduro-king", "dj-znobia-ao", "baile-funk-ao"].map(u => <div key={u} className="p-2 rounded-lg border border-white/5 text-xs text-muted-foreground">@{u}</div>)}</div>
</div>) }
