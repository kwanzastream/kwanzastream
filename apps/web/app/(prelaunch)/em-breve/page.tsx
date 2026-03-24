"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Loader2, CheckCircle2, ArrowRight, Share2 } from "lucide-react"
import { api } from "@/lib/api"

/* ─── animated headline words ─── */
const CYCLE_WORDS = [
  "música",
  "diversão",
  "cultura",
  "conexão",
  "comunidade",
  "criatividade",
]

/* ─── Blob configuration for the animated gradient ─── */
interface Blob {
  x: number
  y: number
  radius: number
  color: [number, number, number]
  alpha: number
  speedX: number
  speedY: number
  phaseX: number
  phaseY: number
  pulseSpeed: number
  pulsePhase: number
}

const BLOBS: Blob[] = [
  {
    x: 0.3, y: 0.3, radius: 0.5,
    color: [206, 17, 38], alpha: 0.5,
    speedX: 0.4, speedY: 0.3,
    phaseX: 0, phaseY: 0.5,
    pulseSpeed: 0.2, pulsePhase: 0,
  },
  {
    x: 0.7, y: 0.7, radius: 0.4,
    color: [249, 214, 22], alpha: 0.35,
    speedX: 0.3, speedY: 0.5,
    phaseX: 1.2, phaseY: 0.8,
    pulseSpeed: 0.25, pulsePhase: 1.0,
  },
  {
    x: 0.5, y: 0.4, radius: 0.45,
    color: [180, 12, 28], alpha: 0.4,
    speedX: 0.35, speedY: 0.25,
    phaseX: 2.5, phaseY: 1.5,
    pulseSpeed: 0.18, pulsePhase: 2.0,
  },
  {
    x: 0.2, y: 0.65, radius: 0.35,
    color: [220, 140, 20], alpha: 0.3,
    speedX: 0.45, speedY: 0.35,
    phaseX: 0.8, phaseY: 2.2,
    pulseSpeed: 0.22, pulsePhase: 0.5,
  },
  {
    x: 0.75, y: 0.25, radius: 0.3,
    color: [25, 8, 45], alpha: 0.55,
    speedX: 0.28, speedY: 0.4,
    phaseX: 3.0, phaseY: 0.3,
    pulseSpeed: 0.15, pulsePhase: 1.5,
  },
  {
    x: 0.6, y: 0.55, radius: 0.38,
    color: [160, 30, 10], alpha: 0.25,
    speedX: 0.5, speedY: 0.45,
    phaseX: 1.8, phaseY: 2.8,
    pulseSpeed: 0.3, pulsePhase: 3.0,
  },
]

export default function PreLaunchPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [count, setCount] = useState<number | null>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  /* fetch initial count */
  useEffect(() => {
    api.get("/api/prelaunch/count")
      .then((r) => setCount(r.data.count))
      .catch(() => {})
  }, [])

  /* cycle words */
  useEffect(() => {
    const t = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % CYCLE_WORDS.length)
        setIsAnimating(false)
      }, 400)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  /* ─── React-driven canvas gradient animation ─── */
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    // Clear with dark base
    ctx.fillStyle = "#050505"
    ctx.fillRect(0, 0, w, h)

    // Draw each blob with organic movement
    const minDim = Math.min(w, h)

    for (const blob of BLOBS) {
      // Organic motion using sin/cos with different phases and speeds
      const cx = w * blob.x + Math.sin(t * blob.speedX + blob.phaseX) * w * 0.12
        + Math.cos(t * blob.speedX * 0.7 + blob.phaseY) * w * 0.05
      const cy = h * blob.y + Math.cos(t * blob.speedY + blob.phaseY) * h * 0.1
        + Math.sin(t * blob.speedY * 0.6 + blob.phaseX) * h * 0.04

      // Pulsing radius
      const pulse = 1 + Math.sin(t * blob.pulseSpeed + blob.pulsePhase) * 0.15
      const r = minDim * blob.radius * pulse

      // Create gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      const [cr, cg, cb] = blob.color
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},${blob.alpha})`)
      grad.addColorStop(0.3, `rgba(${cr},${cg},${cb},${blob.alpha * 0.6})`)
      grad.addColorStop(0.6, `rgba(${cr},${cg},${cb},${blob.alpha * 0.2})`)
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)

      ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    }

    // Reset composite
    ctx.globalCompositeOperation = "source-over"

    // Add a subtle vignette
    const vignette = ctx.createRadialGradient(w / 2, h / 2, minDim * 0.2, w / 2, h / 2, minDim * 0.9)
    vignette.addColorStop(0, "rgba(0,0,0,0)")
    vignette.addColorStop(0.7, "rgba(0,0,0,0.15)")
    vignette.addColorStop(1, "rgba(0,0,0,0.5)")
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, w, h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1
    // Cap DPR for performance on high-res displays
    if (dpr > 2) dpr = 2

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const loop = (timestamp: number) => {
      // Convert to seconds, smooth timing
      const dt = timestamp * 0.001
      timeRef.current = dt

      const rect = canvas.getBoundingClientRect()
      // Reset transform before drawing
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawFrame(ctx, rect.width, rect.height, dt)

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [drawFrame])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")
    try {
      const res = await api.post("/api/prelaunch/subscribe", { email, source: "web" })
      setStatus("success")
      setMessage(res.data.message || "Inscrição feita com sucesso!")
      if (res.data.count != null) setCount(res.data.count)
    } catch {
      setStatus("error")
      setMessage("Algo correu mal. Tenta novamente.")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      "🚀 A Kwanza Stream está quase a chegar — a plataforma de streaming feita para Angola! Inscreve-te e sê dos primeiros: " +
        (typeof window !== "undefined" ? window.location.href : "https://kwanzastream.com/em-breve")
    )
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#050505] flex flex-col">
      {/* ─── React-animated gradient canvas ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, filter: "blur(60px) saturate(1.4)" }}
      />

      {/* ─── Noise grain overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          zIndex: 1,
        }}
      />

      {/* ─── Dot pattern overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          zIndex: 2,
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* ─── Header ─── */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/kwanza-logo.png"
              alt="Kwanza Stream"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-white/90 text-sm font-medium tracking-wide hidden sm:inline">
              KWANZA STREAM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/40 uppercase tracking-widest hidden md:inline">
              Luanda, Angola
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse" />
            <span className="text-[11px] text-white/40 font-mono hidden md:inline">
              Em breve
            </span>
          </div>
        </header>

        {/* ─── Hero ─── */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
          {/* Large headline */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-14">
            <h1 className="text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              O futuro da{" "}
              <span className="relative inline-block">
                <span
                  className={`inline-block transition-all duration-400 ${
                    isAnimating
                      ? "opacity-0 translate-y-4 blur-sm"
                      : "opacity-100 translate-y-0 blur-0"
                  }`}
                  style={{ color: "#CE1126" }}
                >
                  {CYCLE_WORDS[wordIdx]}
                </span>
              </span>
              <br />
              angolana está{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #F9D616, #CE1126)",
                }}
              >
                a chegar
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Sê dos primeiros a entrar na plataforma de streaming feita para Angola.
              Deixa o teu email e avisamos-te quando estivermos ao vivo.
            </p>
          </div>

          {/* ─── Email capture ─── */}
          {status !== "success" ? (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O teu melhor email"
                  className="w-full h-12 sm:h-14 px-5 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder:text-white/30 text-base outline-none focus:border-[#CE1126]/60 focus:ring-2 focus:ring-[#CE1126]/20 transition-all backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 sm:h-14 px-8 rounded-xl font-semibold text-white text-base transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #CE1126, #a00d1e)",
                  boxShadow: "0 0 30px rgba(206,17,38,0.3), 0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Avisar-me
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ─── Success state ─── */
            <div className="w-full max-w-md mx-auto text-center animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(206,17,38,0.2), rgba(249,214,22,0.1))",
                    boxShadow: "0 0 40px rgba(206,17,38,0.2)",
                  }}
                >
                  <CheckCircle2 className="w-8 h-8 text-[#CE1126]" />
                </div>
              </div>
              <p className="text-white text-lg font-medium mb-2">{message}</p>
              <p className="text-white/40 text-sm mb-6">
                Partilha com os teus amigos para serem dos primeiros 🇦🇴
              </p>
              <button
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-medium text-white border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] transition-all"
              >
                <Share2 className="w-4 h-4" />
                Partilhar no WhatsApp
              </button>
            </div>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-[#CE1126]">{message}</p>
          )}

          {/* ─── Subscriber count ─── */}
          {count !== null && count > 0 && (
            <div className="mt-8 flex items-center gap-2 text-sm text-white/30">
              <div className="flex -space-x-1.5">
                {[...Array(Math.min(count, 4))].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-[#0A0A0A]"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#CE1126", "#F9D616", "#CE1126", "#F9D616"][i % 4]
                      }, ${["#a00d1e", "#d4b514", "#a00d1e", "#d4b514"][i % 4]})`,
                    }}
                  />
                ))}
              </div>
              <span>
                <span className="text-white/60 font-medium">
                  {count.toLocaleString("pt-AO")}
                </span>{" "}
                {count === 1 ? "pessoa inscrita" : "pessoas já inscritas"}
              </span>
            </div>
          )}
        </main>

        {/* ─── Bottom bar ─── */}
        <footer className="px-6 md:px-12 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/25 uppercase tracking-widest">
            <div className="flex items-center gap-6">
              <span>Feito em Angola 🇦🇴</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Streaming angolano</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Mobile-first</span>
              <span>·</span>
              <span>© 2026 Kwanza Stream</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
