"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/lib/auth-context"
import {
    Crown, Star, Shield, Check, Zap, Video, MessageCircle,
    Heart, ChevronRight, Users, Sparkles
} from "lucide-react"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface SubscriptionPlan {
    tier: string
    name: string
    price: number
    icon: React.ReactNode
    color: string
    gradient: string
    features: string[]
    popular?: boolean
}

const PLANS: SubscriptionPlan[] = [
    {
        tier: "FREE",
        name: "Grátis",
        price: 0,
        icon: <Users className="w-6 h-6" />,
        color: "text-gray-400",
        gradient: "from-gray-600/20 to-gray-700/10",
        features: [
            "Assistir streams",
            "Chat público",
            "Seguir creators",
            "Enviar salos (doações)",
        ],
    },
    {
        tier: "SUPPORTER",
        name: "Apoiante",
        price: 2500,
        icon: <Star className="w-6 h-6" />,
        color: "text-blue-400",
        gradient: "from-blue-600/20 to-blue-700/10",
        popular: true,
        features: [
            "Tudo do Grátis",
            "Badge exclusivo no chat",
            "Emojis personalizados",
            "Sem anúncios",
            "Acesso antecipado a VODs",
        ],
    },
    {
        tier: "VIP",
        name: "VIP",
        price: 7500,
        icon: <Crown className="w-6 h-6" />,
        color: "text-amber-400",
        gradient: "from-amber-600/20 to-orange-700/10",
        features: [
            "Tudo do Apoiante",
            "Badge VIP dourado",
            "Mensagens prioritárias no chat",
            "Acesso ao Discord privado",
            "Conteúdo exclusivo do creator",
            "Notificações prioritárias",
        ],
    },
]

interface ActiveSub {
    id: string
    tier: string
    creatorId: string
    creator: { displayName: string; username: string; avatarUrl: string | null }
    active: boolean
    expiresAt: string | null
}

export default function SubscriptionsPage() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<"plans" | "my">("plans")
    const [mySubs, setMySubs] = useState<ActiveSub[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMySubs()
    }, [user])

    const fetchMySubs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/subscriptions/my`, { credentials: "include" })
            if (res.ok) {
                const data = await res.json()
                setMySubs(data.subscriptions || [])
            }
        } catch { }
        setLoading(false)
    }

    const formatKz = (amount: number) =>
        new Intl.NumberFormat("pt-AO", { minimumFractionDigits: 0 }).format(amount) + " Kz"

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
                <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" /> Subscrições
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                            Apoia os teus Creators
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                            Subscreve aos teus creators favoritos e desbloqueia benefícios exclusivos
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center">
                        <div className="flex bg-white/[0.04] rounded-xl p-1 gap-1">
                            <button
                                onClick={() => setActiveTab("plans")}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "plans" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                Planos
                            </button>
                            <button
                                onClick={() => setActiveTab("my")}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "my" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                                    }`}
                            >
                                As Minhas ({mySubs.length})
                            </button>
                        </div>
                    </div>

                    {/* Plans Grid */}
                    {activeTab === "plans" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PLANS.map((plan) => (
                                <div
                                    key={plan.tier}
                                    className={`relative rounded-2xl border ${plan.popular
                                            ? "border-primary/50 bg-primary/5"
                                            : "border-white/[0.08] bg-white/[0.02]"
                                        } p-6 space-y-5 hover:border-primary/30 transition-all`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold text-white">
                                            Mais Popular
                                        </div>
                                    )}

                                    {/* Icon + Name */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center ${plan.color}`}>
                                        {plan.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mt-1">
                                            <span className="text-3xl font-black text-white">
                                                {plan.price === 0 ? "Grátis" : formatKz(plan.price)}
                                            </span>
                                            {plan.price > 0 && <span className="text-sm text-muted-foreground">/mês</span>}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2.5">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                <Check className={`w-4 h-4 shrink-0 ${plan.color}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.popular
                                                ? "bg-primary text-white hover:bg-primary/80"
                                                : "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                                            }`}
                                    >
                                        {plan.price === 0 ? "Plano Actual" : "Subscrever"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* My Subscriptions */}
                    {activeTab === "my" && (
                        <div className="space-y-4">
                            {mySubs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <Heart className="w-12 h-12 text-muted-foreground/30 mb-3" />
                                    <p className="text-sm text-muted-foreground">Sem subscrições activas</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">
                                        Explora creators e subscreve aos teus favoritos
                                    </p>
                                    <Link
                                        href="/explore"
                                        className="mt-4 px-6 py-2.5 bg-primary rounded-xl text-sm font-bold text-white hover:bg-primary/80 transition-colors"
                                    >
                                        Explorar Creators
                                    </Link>
                                </div>
                            ) : (
                                mySubs.map((sub) => {
                                    const plan = PLANS.find(p => p.tier === sub.tier)
                                    return (
                                        <div key={sub.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all">
                                            {sub.creator.avatarUrl ? (
                                                <img src={sub.creator.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center text-sm font-bold">
                                                    {(sub.creator.displayName || sub.creator.username || "?")[0].toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-white truncate">
                                                    {sub.creator.displayName || sub.creator.username}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-xs font-medium ${plan?.color || "text-gray-400"}`}>
                                                        {plan?.name || sub.tier}
                                                    </span>
                                                    {sub.expiresAt && (
                                                        <span className="text-[10px] text-muted-foreground">
                                                            Expira {new Date(sub.expiresAt).toLocaleDateString("pt-AO")}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}

                    {/* FAQ Section */}
                    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Perguntas Frequentes</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Como funciona a subscrição?", a: "Subscreves mensalmente ao teu creator favorito. O pagamento é processado via Kwanza Stream e podes cancelar a qualquer momento." },
                                { q: "Posso subscrever a vários creators?", a: "Sim! Podes ter subscrições activas a quantos creators quiseres." },
                                { q: "O que acontece quando a subscrição expira?", a: "Perdes acesso aos benefícios exclusivos do plano, mas continuas a poder assistir streams e usar o chat público." },
                            ].map((faq, i) => (
                                <div key={i}>
                                    <p className="text-sm font-medium text-white">{faq.q}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <MobileNav />
        </div>
    )
}
