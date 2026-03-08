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
  Loader2,
  Camera,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Suspense } from "react"
import { useAuth } from "@/lib/auth-context"
import { userService } from "@/lib/services"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

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
  // Angolan culture categories
  { id: "kuduro", label: "Kuduro & Dança", icon: Music, color: "text-amber-500" },
  { id: "art", label: "Arte & Pintura", icon: Briefcase, color: "text-rose-400" },
  { id: "faith", label: "Religião & Fé", icon: GraduationCap, color: "text-indigo-400" },
  { id: "culture", label: "Cultura Angolana", icon: Trophy, color: "text-emerald-500" },
]

function OnboardingContent() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [step, setStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [profile, setProfile] = React.useState({ name: "", username: "", bio: "" })
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([])
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = React.useState<string>("")

  // Username validation state
  const [usernameStatus, setUsernameStatus] = React.useState<"idle" | "checking" | "available" | "taken">("idle")
  const usernameCheckTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const progress = step === 0 ? 0 : step === 5 ? 100 : step * 25

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  // Pre-fill from existing user data
  React.useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName || "",
        username: user.username || "",
        bio: user.bio || "",
      })
      if (user.avatarUrl) setAvatarPreview(user.avatarUrl)
    }
  }, [user])

  // Debounced username check
  const handleUsernameChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "")
    setProfile((prev) => ({ ...prev, username: sanitized }))

    if (usernameCheckTimeout.current) clearTimeout(usernameCheckTimeout.current)

    if (sanitized.length < 3) {
      setUsernameStatus("idle")
      return
    }

    setUsernameStatus("checking")
    usernameCheckTimeout.current = setTimeout(async () => {
      try {
        const res = await userService.checkUsername(sanitized)
        setUsernameStatus(res.data.available ? "available" : "taken")
      } catch {
        setUsernameStatus("idle")
      }
    }, 400)
  }

  // Handle avatar file selection
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setError("A foto deve ter menos de 2MB.")
      return
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Usa uma imagem JPEG, PNG ou WebP.")
      return
    }

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
    setError("")
  }

  // Submit onboarding to backend
  const handleComplete = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Upload avatar if selected
      if (avatarFile) {
        await userService.uploadAvatar(avatarFile)
      }

      // Complete onboarding (persist profile + interests)
      await userService.completeOnboarding({
        displayName: profile.name,
        username: profile.username,
        bio: profile.bio,
        interests: selectedInterests,
      })

      // Refresh user context
      await refreshUser()

      // Move to completion step
      setStep(5)
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao completar onboarding")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 angola-pattern">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo and Progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/kwanza-logo.png" alt="Kwanza Stream" width={40} height={40} className="rounded-xl shadow-lg shadow-primary/20" />
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

        {/* Error banner */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

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
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary ring-4 ring-primary/10">
                    <AvatarImage src={avatarPreview || "/abstract-profile.png"} />
                    <AvatarFallback className="text-2xl">
                      {profile.name?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleAvatarSelect}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Clica na foto para mudar (máx 2MB)</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome de exibição</label>
                  <Input
                    placeholder="Ex: Elsio Costa"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                    <Input
                      placeholder="username"
                      className={cn(
                        "pl-7 pr-10 bg-white/5 border-white/10",
                        usernameStatus === "taken" && "border-red-500/50 focus-visible:ring-red-500",
                        usernameStatus === "available" && "border-green-500/50 focus-visible:ring-green-500"
                      )}
                      value={profile.username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      maxLength={30}
                    />
                    <div className="absolute right-3 top-2.5">
                      {usernameStatus === "checking" && <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />}
                      {usernameStatus === "available" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {usernameStatus === "taken" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    </div>
                  </div>
                  {usernameStatus === "taken" && (
                    <p className="text-xs text-red-400">Username já está em uso.</p>
                  )}
                  {usernameStatus === "available" && (
                    <p className="text-xs text-green-400">Username disponível!</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio (Opcional)</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                    placeholder="Conta um pouco sobre ti..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    maxLength={150}
                  />
                  <p className="text-[10px] text-right text-muted-foreground">{profile.bio.length}/150 caracteres</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full h-11 font-bold"
                onClick={nextStep}
                disabled={!profile.name || !profile.username || profile.username.length < 3 || usernameStatus === "taken" || usernameStatus === "checking"}
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

        {/* Step 3: Choose Path */}
        {step === 3 && (
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

        {/* Step 4: Confirmation — calls API */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Tudo Certo?</h2>
              <p className="text-muted-foreground">Revê o teu perfil antes de começar.</p>
            </div>

            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={avatarPreview || "/abstract-profile.png"} />
                    <AvatarFallback className="text-xl">{profile.name?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  </div>
                </div>
                {profile.bio && (
                  <p className="text-sm text-muted-foreground border-t border-white/5 pt-3">{profile.bio}</p>
                )}
                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
                  {selectedInterests.map((id) => {
                    const interest = INTERESTS.find((i) => i.id === id)
                    return interest ? (
                      <span key={id} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {interest.label}
                      </span>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-white/10 bg-transparent" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Ajustar
              </Button>
              <Button
                className="flex-2 h-12 font-bold"
                onClick={handleComplete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A guardar...
                  </>
                ) : (
                  "Completar Perfil"
                )}
              </Button>
            </div>
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
