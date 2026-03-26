"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquarePlus, X, Send, Star, Loader2 } from "lucide-react"

const FEEDBACK_URL = "https://forms.gle/YOUR_FORM_ID" // Replace with actual Google Form

type FeedbackType = "bug" | "feature" | "ux" | "other"

const feedbackTypes: { type: FeedbackType; label: string; emoji: string }[] = [
    { type: "bug", label: "Bug", emoji: "🐛" },
    { type: "feature", label: "Sugestão", emoji: "💡" },
    { type: "ux", label: "UX", emoji: "🎨" },
    { type: "other", label: "Outro", emoji: "💬" },
]

export function BetaFeedback() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const [type, setType] = useState<FeedbackType | null>(null)
    const [message, setMessage] = useState("")
    const [rating, setRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)

    // Hide on standalone pages — must be AFTER all hooks
    if (pathname === '/em-breve') return null

    const handleSubmit = async () => {
        if (!message.trim() || !type) return
        setSending(true)

        // Send to backend (or PostHog capture event)
        try {
            const { trackEvent } = await import("@/lib/posthog")
            trackEvent("beta_feedback", {
                type,
                rating,
                message: message.trim(),
                page: window.location.pathname,
            })
        } catch {
            // PostHog not available, log to console
            console.log("[Feedback]", { type, rating, message: message.trim() })
        }

        setTimeout(() => {
            setSending(false)
            setSubmitted(true)
            setTimeout(() => {
                setOpen(false)
                setSubmitted(false)
                setMessage("")
                setType(null)
                setRating(0)
            }, 2000)
        }, 500)
    }

    return (
        <>
            {/* Floating FAB */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 bg-primary hover:bg-primary/90 text-white rounded-full p-3.5 shadow-2xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 group"
                    aria-label="Enviar feedback"
                >
                    <MessageSquarePlus className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2">
                        <Badge className="bg-red-500 border-none text-[10px] px-1.5 py-0.5 animate-pulse">
                            Beta
                        </Badge>
                    </span>
                </button>
            )}

            {/* Feedback Panel */}
            {open && (
                <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 w-80 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <MessageSquarePlus className="h-4 w-4 text-primary" />
                                <span className="text-sm font-bold">Feedback Beta</span>
                            </div>
                            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {submitted ? (
                            <div className="p-8 text-center space-y-2">
                                <div className="text-4xl">🙏</div>
                                <p className="font-bold">Obrigado!</p>
                                <p className="text-xs text-muted-foreground">O teu feedback ajuda a melhorar o Kwanza Stream.</p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {/* Type selector */}
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Tipo de feedback:</p>
                                    <div className="flex gap-2">
                                        {feedbackTypes.map(ft => (
                                            <button
                                                key={ft.type}
                                                onClick={() => setType(ft.type)}
                                                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${type === ft.type
                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                        : "bg-white/5 text-muted-foreground border border-white/10 hover:border-white/20"
                                                    }`}
                                            >
                                                <span>{ft.emoji}</span>
                                                <span>{ft.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Experiência geral:</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <button
                                                key={n}
                                                onClick={() => setRating(n)}
                                                className="transition-all hover:scale-125"
                                            >
                                                <Star
                                                    className={`h-5 w-5 ${n <= rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Descreve o teu feedback..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                                    maxLength={500}
                                />

                                {/* Submit */}
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!message.trim() || !type || sending}
                                    className="w-full bg-primary gap-2 font-bold"
                                    size="sm"
                                >
                                    {sending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                                    Enviar Feedback
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
