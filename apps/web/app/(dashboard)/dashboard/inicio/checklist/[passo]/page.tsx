"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Camera, FileText, Tag, Key, Image, Users, Radio, Play, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const STEPS: Record<string, { icon: any; title: string; desc: string; actionLabel: string; actionHref: string; tips: string[] }> = {
  "photo": { icon: Camera, title: "Adicionar foto de perfil", desc: "A tua foto de perfil é a primeira coisa que os viewers vêem. Usa uma imagem nítida, de boa qualidade, que te represente ou represente o teu canal.", actionLabel: "Ir para definições de foto", actionHref: "/definicoes/perfil/foto", tips: ["JPG, PNG ou WebP", "Mínimo 200×200px, máximo 5MB", "Recorte circular automático", "Sem logos de outras plataformas"] },
  "bio": { icon: FileText, title: "Escrever bio do canal", desc: "A bio aparece no teu perfil e ajuda os viewers a perceber que tipo de conteúdo fazes.", actionLabel: "Escrever bio", actionHref: "/definicoes/perfil/bio", tips: ["Máximo 300 caracteres (curta)", "Diz o que fazes e quando transmites", "Exemplo: 'Gaming angolano 🎮 FIFA, Call of Duty. Ao vivo terça a sexta 20h'"] },
  "category": { icon: Tag, title: "Escolher categoria principal", desc: "A categoria ajuda os viewers a encontrar-te quando exploram a plataforma.", actionLabel: "Definir categoria", actionHref: "/definicoes/canal", tips: ["Escolhe a que melhor descreve o teu conteúdo", "Podes mudar a qualquer momento", "Categorias populares: Gaming, Música, Comédia"] },
  "stream-key": { icon: Key, title: "Configurar stream key", desc: "A stream key é o código que conecta o teu software de streaming (OBS, Streamlabs) ao Kwanza Stream.", actionLabel: "Ver stream key", actionHref: "/dashboard/stream-config/stream-key", tips: ["Nunca partilhes a tua stream key com ninguém", "Se a stream key for comprometida, regenera uma nova", "OBS: Definições → Stream → Personalizado → Cola a URL e chave"] },
  "offline-banner": { icon: Image, title: "Adicionar banner offline", desc: "O banner offline aparece quando o teu canal não está ao vivo.", actionLabel: "Carregar banner", actionHref: "/definicoes/canal/banner-offline", tips: ["Recomendado: 1920×1080px", "Coloca os teus horários de stream", "Usa cores que representem a tua marca"] },
  "follow": { icon: Users, title: "Seguir 3 canais", desc: "Aprende com outros criadores e faz parte da comunidade.", actionLabel: "Explorar canais", actionHref: "/explorar", tips: ["Segue criadores que admiras", "Vê como fazem streams e interagem", "A comunidade cresce quando apoiamos uns aos outros"] },
  "first-stream": { icon: Radio, title: "Fazer o primeiro stream", desc: "O passo mais importante! Não precisa de ser perfeito — precisa de acontecer.", actionLabel: "Iniciar stream", actionHref: "/go-live", tips: ["Testa antes só para ti (privado)", "Usa áudio claro — é mais importante que vídeo", "Duração mínima sugerida: 30 minutos", "Interage com o chat mesmo que haja poucos viewers"] },
}

export default function PassoPage() {
  const { passo } = useParams()
  const step = STEPS[passo as string]
  if (!step) return <div className="max-w-lg mx-auto py-6 px-4 text-center"><p className="text-muted-foreground">Passo não encontrado</p><Link href="/dashboard/inicio/checklist"><Button variant="outline" className="mt-4">Voltar ao checklist</Button></Link></div>
  const Icon = step.icon
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/inicio/checklist"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">← Voltar ao checklist</h1></div>
      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-3"><Icon className="w-10 h-10 text-primary mx-auto" /><h2 className="text-sm font-bold">{step.title}</h2><p className="text-xs text-muted-foreground">{step.desc}</p></div>
      <Link href={step.actionHref}><Button className="w-full h-12 font-bold gap-2"><Play className="w-4 h-4" />{step.actionLabel}</Button></Link>
      <div className="space-y-1"><p className="text-[10px] font-bold">Dicas:</p>{step.tips.map(t => <p key={t} className="text-[10px] text-muted-foreground flex items-start gap-1">• {t}</p>)}</div>
      <Link href="/suporte"><Button variant="ghost" className="w-full text-xs gap-1"><HelpCircle className="w-3 h-3" />Precisa de ajuda? Contactar suporte</Button></Link>
    </div>
  )
}
