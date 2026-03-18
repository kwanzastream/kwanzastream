import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldX, MessageCircle } from "lucide-react"

interface ChannelSuspendedPageProps {
  username: string
}

export function ChannelSuspendedPage({ username }: ChannelSuspendedPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <ShieldX className="w-10 h-10 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Canal suspenso</h1>
          <p className="text-muted-foreground mt-2">
            O canal <strong>@{username}</strong> foi suspenso por violação dos termos de serviço da plataforma.
          </p>
        </div>
        <div className="space-y-3">
          <Button asChild className="w-full gap-2">
            <Link href="/suporte/ticket">
              <MessageCircle className="w-4 h-4" /> Contactar suporte
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/explorar">Explorar outros canais</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Se és o dono deste canal e acreditas que isto é um erro, contacta o suporte.
        </p>
      </div>
    </div>
  )
}
