import { notFound } from "next/navigation"

const RESERVED_PATHS = [
    "explorar", "ao-vivo", "tendencias", "schedule", "sobre",
    "como-funciona", "parceiros", "kwanza-camp", "angola",
    "provincias", "radio", "drops", "rewards", "leaderboard",
    "torneios", "tribos", "videos", "clips", "shorts", "eventos",
    "categoria", "tags", "pesquisa", "programa-afiliado",
    "programa-partner", "programa-embaixador", "developers",
    "ads", "termos", "privacidade", "copyright", "faq",
    "contacto", "suporte", "imprensa", "carreiras", "anunciantes",
    "acessibilidade", "status", "manutencao", "conta-banida",
    "conta-suspensa", "entrar", "registar", "recuperar-senha",
    "feed", "mensagens", "notificacoes", "definicoes", "perfil",
    "wallet", "salos", "dashboard", "admin", "stream", "embed",
    "gift", "membership", "loja", "kwanza-awards", "conquistas",
    "transparencia", "diretrizes-comunidade", "verificacao-necessaria",
    "stream-offline", "sobre", "403", "404", "500",
]

interface PageProps {
    params: Promise<{ username: string }>
}

export default async function ChannelPage({ params }: PageProps) {
    const { username } = await params

    if (RESERVED_PATHS.includes(username)) {
        notFound()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h1 className="text-2xl font-bold text-muted-foreground">
                Canal: @{username}
            </h1>
            <p className="text-sm text-muted-foreground">
                Em construção
            </p>
        </div>
    )
}
