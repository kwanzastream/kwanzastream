"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Video,
  Search,
  Music,
  Utensils,
  GraduationCap,
  Trophy,
  Newspaper,
  Smile,
  Briefcase,
  Cpu,
  Shirt,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const INTERESTS = [
  { id: "music", label: "Música", icon: Music, color: "text-purple-500" },
  { id: "gaming", label: "Gaming", icon: Video, color: "text-red-500" },
  { id: "cooking", label: "Culinária", icon: Utensils, color: "text-orange-500" },
  { id: "education", label: "Educação", icon: GraduationCap, color: "text-blue-500" },
  { id: "sports", label: "Desporto", icon: Trophy, color: "text-green-500" },
  { id: "news", label: "Notícias", icon: Newspaper, color: "text-blue-400" },
  { id: "comedy", label: "Comédia", icon: Smile, color: "text-yellow-500" },
  { id: "business", label: "Negócios", icon: Briefcase, color: "text-slate-400" },
  { id: "tech", label: "Tecnologia", icon: Cpu, color: "text-cyan-500" },
  { id: "fashion", label: "Moda", icon: Shirt, color: "text-pink-500" },
]

const CREATORS = [
  { name: "Preto Show", handle: "@pretoshow", bio: "Rei do King", followers: "1.2M" },
  { name: "Yola Semedo", handle: "@yolasemedo", bio: "Diva da Música Angolana", followers: "850K" },
  { name: "Anselmo Ralph", handle: "@anselmo", bio: "O Cupido", followers: "2.1M" },
  { name: "Sandra Gomes", handle: "@sandragomes", bio: "Content Creator | Luanda", followers: "45K" },
]

function OnboardingContent() {
  const router = useRouter()
  const [step, setStep] = React.useState(0) // 0: Welcome, 1-4: Steps, 5: Completion
  const [profile, setProfile] = React.useState({ name: "", username: "", bio: "" })
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([])
  const [followed, setFollowed] = React.useState<string[]>([])

  const progress = step === 0 ? 0 : step === 5 ? 100 : step * 25

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleFollow = (handle: string) => {
    setFollowed((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 angola-pattern">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo and Progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">
              K
            </div>
            <span className="font-bold text-2xl tracking-tighter">
              KWANZA <span className="text-secondary">STREAM</span>
            </span>
          </div>
          {step > 0 && step < 5 && (
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Passo {step} de 4</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Bem-vindo à Primeira Rede Social Angolana para Creators!
            </h1>
            <p className="text-muted-foreground text-lg">
              Vamos configurar teu perfil em 4 passos simples para começares a tua jornada.
            </p>
            <Button size="lg" className="w-full h-12 text-lg font-bold" onClick={nextStep}>
              Começar
            </Button>
          </div>
        )}

        {/* Step 1: Profile Setup */}
        {step === 1 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Cria o Teu Perfil</CardTitle>
              <CardDescription>Como é que os outros te vão ver na Kwanza Stream?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-primary ring-4 ring-primary/10">
                  <AvatarImage src="/abstract-profile.png" />
                  <AvatarFallback className="text-2xl">EC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="border-white/10 bg-transparent">
                  Mudar Foto
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome de exibição</label>
                  <Input
                    placeholder="Ex: Elsio Costa"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                    <Input
                      placeholder="username"
                      className="pl-7 bg-white/5 border-white/10"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio (Opcional)</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                    placeholder="Conta um pouco sobre ti..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                  <p className="text-[10px] text-right text-muted-foreground">{profile.bio.length}/150 caracteres</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full h-11 font-bold"
                onClick={nextStep}
                disabled={!profile.name || !profile.username}
              >
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">O Que Te Interessa?</CardTitle>
              <CardDescription>Escolhe pelo menos 3 para personalizarmos o teu feed.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                      selectedInterests.includes(item.id)
                        ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(206,17,38,0.1)]"
                        : "bg-white/5 border-white/10 hover:border-white/20",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", item.color)} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {selectedInterests.includes(item.id) && <Check className="h-4 w-4 ml-auto text-primary" />}
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="outline" className="flex-1 border-white/10 bg-transparent" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="flex-2 font-bold" onClick={nextStep} disabled={selectedInterests.length < 3}>
                Próximo ({selectedInterests.length}/3)
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Follow */}
        {step === 3 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Segue Alguns Creators</CardTitle>
              <CardDescription>Começa a tua jornada seguindo creators populares em Angola.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {CREATORS.map((creator) => (
                <div
                  key={creator.handle}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/.jpg?query=${creator.name}`} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold truncate">{creator.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {creator.handle} • {creator.followers}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={followed.includes(creator.handle) ? "outline" : "default"}
                    size="sm"
                    className={cn(
                      "h-8 px-4 font-bold transition-all",
                      followed.includes(creator.handle) && "border-primary text-primary",
                    )}
                    onClick={() => toggleFollow(creator.handle)}
                  >
                    {followed.includes(creator.handle) ? "Seguindo" : "Seguir"}
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="outline" className="flex-1 border-white/10 bg-transparent" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="flex-2 font-bold" onClick={nextStep}>
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Choose Path */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Como Queres Usar Kwanza Stream?</h2>
              <p className="text-muted-foreground">Podes mudar de ideias a qualquer momento.</p>
            </div>
            <div className="grid gap-4">
              <button
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 transition-all text-left flex items-start gap-4"
                onClick={nextStep}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Quero Assistir e Descobrir</h3>
                  <p className="text-sm text-muted-foreground">
                    Explora lives, segue creators e participa da maior comunidade Angolana.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto self-center text-muted-foreground group-hover:text-primary transition-colors" />
              </button>

              <button
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/50 transition-all text-left flex items-start gap-4"
                onClick={nextStep}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Quero Fazer Lives e Ganhar Dinheiro</h3>
                  <p className="text-sm text-muted-foreground">
                    Torna-te um creator profissional, faz streams e monetiza o teu conteúdo.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto self-center text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={prevStep}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
          </div>
        )}

        {/* Step 5: Completion */}
        {step === 5 && (
          <div className="text-center space-y-8 py-12 animate-in zoom-in-95 duration-500">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-primary rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 mx-auto">
                <Check className="h-12 w-12 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">Tudo Pronto! 🎉</h1>
              <p className="text-muted-foreground text-lg">
                Teu perfil está configurado. Bem-vindo à família Kwanza Stream.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-xl font-bold shadow-xl shadow-primary/20"
              onClick={() => router.push("/feed")}
            >
              Explorar Kwanza Stream
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={null}>
      <OnboardingContent />
    </Suspense>
  )
}
