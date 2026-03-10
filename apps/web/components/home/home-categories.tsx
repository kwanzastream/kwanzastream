"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

const CATEGORY_EMOJIS: Record<string, string> = {
    gaming: "🎮", musica: "🎵", futebol: "⚽", "just-talking": "💬",
    irl: "📍", comedia: "😂", criatividade: "🎨", tech: "💻",
    desporto: "🏋️", culinaria: "🍲", radio: "📻", educacao: "📚",
}

const CATEGORY_GRADIENTS: Record<string, string> = {
    gaming: "from-purple-900/80 to-purple-600/40",
    musica: "from-pink-900/80 to-pink-600/40",
    futebol: "from-green-900/80 to-green-600/40",
    "just-talking": "from-blue-900/80 to-blue-600/40",
    irl: "from-orange-900/80 to-orange-600/40",
    comedia: "from-yellow-900/80 to-yellow-600/40",
    criatividade: "from-rose-900/80 to-rose-600/40",
    tech: "from-cyan-900/80 to-cyan-600/40",
}

const FALLBACK_CATEGORIES = [
    { id: "1", name: "Gaming", slug: "gaming" },
    { id: "2", name: "Música ao Vivo", slug: "musica" },
    { id: "3", name: "Futebol", slug: "futebol" },
    { id: "4", name: "Just Talking", slug: "just-talking" },
    { id: "5", name: "IRL Angola", slug: "irl" },
    { id: "6", name: "Comédia", slug: "comedia" },
    { id: "7", name: "Criatividade", slug: "criatividade" },
    { id: "8", name: "Tech & Negócios", slug: "tech" },
    { id: "9", name: "Rádio", slug: "radio" },
    { id: "10", name: "Educação", slug: "educacao" },
    { id: "11", name: "Desporto", slug: "desporto" },
    { id: "12", name: "Culinária", slug: "culinaria" },
]

export function HomeCategories() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/api/streams/categories")
            .then((res) => {
                const cats = res.data?.categories || res.data || []
                setCategories(cats.length > 0 ? cats : FALLBACK_CATEGORIES)
            })
            .catch(() => setCategories(FALLBACK_CATEGORIES))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.slice(0, 12).map((cat) => (
                <Link key={cat.id} href={`/categoria/${cat.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:scale-[1.02]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_GRADIENTS[cat.slug] || "from-primary/30 to-primary/10"}`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                        <span className="text-3xl">{CATEGORY_EMOJIS[cat.slug] ?? "📺"}</span>
                        <span className="text-xs font-semibold text-center leading-tight">{cat.name}</span>
                        {cat.streamCount !== undefined && <span className="text-[10px] text-muted-foreground">{cat.streamCount} streams</span>}
                    </div>
                </Link>
            ))}
        </div>
    )
}
