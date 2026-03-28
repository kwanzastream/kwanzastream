import Link from "next/link"
import { MapPin, Users, Briefcase, Heart } from "lucide-react"

const POSITIONS = [
  { title: "Engenheiro Full-Stack (Sénior)", team: "Engenharia", location: "Luanda / Remoto", type: "Tempo inteiro", desc: "Construir features core da plataforma com Next.js, Express e Prisma." },
  { title: "Engenheiro de Streaming/Média", team: "Infraestrutura", location: "Luanda", type: "Tempo inteiro", desc: "Arquitectar e optimizar a infra de streaming RTMP/HLS para o mercado angolano." },
  { title: "Designer UI/UX", team: "Design", location: "Luanda / Remoto", type: "Tempo inteiro", desc: "Criar experiências mobile-first para a maior plataforma de streaming de Angola." },
  { title: "Community Manager", team: "Marketing", location: "Luanda", type: "Tempo inteiro", desc: "Gerir a comunidade de creators e viewers, moderação e crescimento." },
  { title: "Content Creator Lead", team: "Conteúdo", location: "Luanda", type: "Tempo inteiro", desc: "Recrutar e apoiar os melhores creators angolanos a juntarem-se à plataforma." },
  { title: "Especialista em Parcerias", team: "Negócios", location: "Luanda", type: "Tempo inteiro", desc: "Fechar acordos com marcas angolanas e internacionais para sponsorships de streams." },
]

const PERKS = [
  { icon: "💰", title: "Salário competitivo", desc: "Em kwanzas, com bónus de performance" },
  { icon: "🏠", title: "Trabalho remoto", desc: "Flexibilidade para trabalhar de onde quiseres" },
  { icon: "📚", title: "Formação contínua", desc: "Budget anual para cursos e conferências" },
  { icon: "🎮", title: "Setup gaming", desc: "Equipamento e acesso premium à plataforma" },
  { icon: "🏥", title: "Seguro de saúde", desc: "Para ti e a tua família" },
  { icon: "🚀", title: "Stock options", desc: "Participa no crescimento da empresa" },
]

export default function CarreirasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Junta-te à equipa 🇦🇴</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Estamos a construir a maior plataforma de streaming de Angola. Procuramos pessoas apaixonadas por tecnologia, cultura angolana e inovação.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Equipa", value: "15+" },
          { icon: MapPin, label: "Base", value: "Luanda" },
          { icon: Briefcase, label: "Vagas abertas", value: String(POSITIONS.length) },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Positions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Posições Abertas</h2>
        <div className="space-y-3">
          {POSITIONS.map((pos) => (
            <div key={pos.title} className="p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">{pos.title}</h3>
                  <p className="text-xs text-muted-foreground">{pos.desc}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{pos.team}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{pos.location}</span>
                    <span className="text-[10px] text-muted-foreground">{pos.type}</span>
                  </div>
                </div>
                <a href={`mailto:carreiras@kwanzastream.ao?subject=Candidatura: ${pos.title}`} className="shrink-0 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">Candidatar</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Benefícios</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PERKS.map((perk) => (
            <div key={perk.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl block mb-2">{perk.icon}</span>
              <p className="text-sm font-medium">{perk.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
        <p className="font-semibold mb-1">Não encontraste a vaga ideal?</p>
        <p className="text-sm text-muted-foreground mb-3">Envia o teu CV para <a href="mailto:carreiras@kwanzastream.ao" className="text-primary hover:underline">carreiras@kwanzastream.ao</a></p>
      </div>
    </div>
  )
}
