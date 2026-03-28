import Link from "next/link"

const PROVINCIAS = [
  { name: "Bengo", emoji: "🌴", streamers: 5, live: 0 },
  { name: "Benguela", emoji: "🌊", streamers: 45, live: 3 },
  { name: "Bié", emoji: "🌻", streamers: 5, live: 0 },
  { name: "Cabinda", emoji: "🛢️", streamers: 20, live: 2 },
  { name: "Cuando", emoji: "🐘", streamers: 3, live: 0 },
  { name: "Cuanza Norte", emoji: "🌾", streamers: 6, live: 0 },
  { name: "Cuanza Sul", emoji: "🐟", streamers: 8, live: 1 },
  { name: "Cubango", emoji: "🦁", streamers: 4, live: 0 },
  { name: "Cunene", emoji: "🏜️", streamers: 5, live: 0 },
  { name: "Huambo", emoji: "🏔️", streamers: 30, live: 2 },
  { name: "Huíla", emoji: "🌄", streamers: 25, live: 1 },
  { name: "Icolo e Bengo", emoji: "🏞️", streamers: 3, live: 0 },
  { name: "Luanda", emoji: "🏙️", streamers: 250, live: 12 },
  { name: "Lunda Norte", emoji: "💎", streamers: 15, live: 0 },
  { name: "Lunda Sul", emoji: "💎", streamers: 12, live: 0 },
  { name: "Malanje", emoji: "🌿", streamers: 10, live: 1 },
  { name: "Moxico", emoji: "🦁", streamers: 4, live: 0 },
  { name: "Moxico Leste", emoji: "🌳", streamers: 2, live: 0 },
  { name: "Namibe", emoji: "🏖️", streamers: 10, live: 1 },
  { name: "Uíge", emoji: "☕", streamers: 8, live: 0 },
  { name: "Zaire", emoji: "🌍", streamers: 7, live: 0 },
]

export default function ProvinciasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Angola — 21 Províncias 🇦🇴</h1>
        <p className="text-muted-foreground">Descobre criadores de todo o país. O Kwanza Stream é feito de Angola, para Angola.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold text-primary">{PROVINCIAS.length}</p>
          <p className="text-xs text-muted-foreground">Províncias</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold text-primary">{PROVINCIAS.reduce((a, p) => a + p.streamers, 0)}+</p>
          <p className="text-xs text-muted-foreground">Creators</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-2xl font-bold text-[#CE1126]">{PROVINCIAS.reduce((a, p) => a + p.live, 0)}</p>
          <p className="text-xs text-muted-foreground">Ao vivo agora</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {PROVINCIAS.map((prov) => (
          <Link key={prov.name} href={`/provincias/${prov.name.toLowerCase().replace(/ /g, "-")}`} className="group">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center space-y-2">
              <span className="text-3xl block">{prov.emoji}</span>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{prov.name}</p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <span>{prov.streamers} creators</span>
                {prov.live > 0 && (
                  <span className="flex items-center gap-1 text-[#CE1126]">
                    <span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />{prov.live}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
