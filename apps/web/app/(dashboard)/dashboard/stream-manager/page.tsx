"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useChat } from "@/hooks/use-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Radio, Eye, Send, Copy, RefreshCw, MessageSquare, Activity, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

const CATEGORIES = [
  "gaming", "musica", "futebol", "just-talking", "irl", "comedia", "criatividade", "tech", "desporto", "culinaria", "radio", "educacao"
]
const CATEGORY_LABELS: Record<string, string> = {
  gaming: "🎮 Gaming", musica: "🎵 Música ao Vivo", futebol: "⚽ Futebol", "just-talking": "💬 Just Talking",
  irl: "📍 IRL Angola", comedia: "😂 Comédia", criatividade: "🎨 Criatividade", tech: "💻 Tech & Negócios",
  desporto: "🏋️ Desporto", culinaria: "🍲 Culinária", radio: "📻 Rádio", educacao: "📚 Educação"
}

export default function StreamManagerPage() {
  const { user } = useAuth()
  const [activeStream, setActiveStream] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [setup, setSetup] = useState({ title: "", category: "gaming", contentClassification: "EVERYONE" })
  const [saving, setSaving] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId: activeStream?.id || "", enabled: !!activeStream?.id })

  const rtmpUrl = `rtmp://${process.env.NEXT_PUBLIC_RTMP_HOST || "stream.kwanzastream.ao"}:1935/live`

  useEffect(() => {
    if (!user?.id) return
    api.get(`/api/streams/user/${user.id}`)
      .then((res) => {
        const streams = res.data?.streams || res.data || []
        const live = streams.find((s: any) => s.status === "LIVE")
        if (live) { setActiveStream(live); setSetup({ title: live.title, category: live.category, contentClassification: live.contentClassification || "EVERYONE" }) }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.id])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const handleSaveSetup = async () => {
    if (!setup.title.trim()) { toast.error("O título é obrigatório"); return }
    setSaving(true)
    try {
      if (activeStream) { await api.put(`/api/streams/${activeStream.id}`, setup); toast.success("Stream actualizado!") }
      else { const res = await api.post("/api/streams/", setup); setActiveStream(res.data.stream || res.data); toast.success("Stream configurado! Começa a transmitir no OBS.") }
    } catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao guardar") }
    finally { setSaving(false) }
  }

  const handleEndStream = async () => {
    if (!activeStream || !confirm("Tens a certeza que queres terminar o stream?")) return
    try { await api.post(`/api/streams/${activeStream.id}/end`); setActiveStream(null); toast.success("Stream terminado!") }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro ao terminar") }
  }

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !isConnected) return
    sendMessage(chatInput.trim()); setChatInput("")
  }

  const copyToClipboard = async (text: string, label: string) => { await navigator.clipboard.writeText(text); toast.success(`${label} copiado!`) }

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">Stream Manager{activeStream && <Badge className="bg-[#CE1126] text-white gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />AO VIVO</Badge>}</h1>
          {activeStream && <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{viewerCount} a ver agora</p>}
        </div>
        {activeStream && <Button variant="destructive" size="sm" onClick={handleEndStream}>Terminar stream</Button>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Config */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3"><CardTitle className="text-base">Configuração do stream</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5"><Label>Título do stream *</Label><Input placeholder="Descobre o que vais transmitir hoje" value={setup.title} onChange={(e) => setSetup((s) => ({ ...s, title: e.target.value }))} maxLength={140} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Categoria</Label>
                  <Select value={setup.category} onValueChange={(v) => setSetup((s) => ({ ...s, category: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((cat) => <SelectItem key={cat} value={cat}>{CATEGORY_LABELS[cat]}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="space-y-1.5"><Label>Classificação</Label>
                  <Select value={setup.contentClassification} onValueChange={(v) => setSetup((s) => ({ ...s, contentClassification: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="EVERYONE">🟢 Todos</SelectItem><SelectItem value="TEEN">🟡 Teen (13+)</SelectItem><SelectItem value="MATURE">🔴 Mature (18+)</SelectItem></SelectContent></Select>
                </div>
              </div>
              <Button onClick={handleSaveSetup} disabled={saving || !setup.title.trim()} className="w-full">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : activeStream ? "Actualizar stream" : "Guardar configuração"}</Button>
            </CardContent>
          </Card>

          {/* Credentials */}
          <Card className="border-border/50">
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2">Credenciais de transmissão<Badge variant="outline" className="text-[10px]">OBS / Streamlabs</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5"><Label className="text-xs">RTMP URL</Label>
                <div className="flex gap-2"><Input value={rtmpUrl} readOnly className="font-mono text-xs bg-muted/30" /><Button variant="outline" size="icon" onClick={() => copyToClipboard(rtmpUrl, "URL")}><Copy className="w-3.5 h-3.5" /></Button></div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between"><Label className="text-xs">Stream Key</Label>
                  <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={async () => { try { await api.post("/api/users/me/stream-key"); toast.success("Nova key gerada! Actualiza a página.") } catch { toast.error("Erro ao gerar") } }}><RefreshCw className="w-3 h-3" />Regenerar</Button>
                </div>
                <div className="flex gap-2"><Input value={user?.streamKey || "—"} readOnly type="password" className="font-mono text-xs bg-muted/30" /><Button variant="outline" size="icon" onClick={() => copyToClipboard(user?.streamKey || "", "Stream key")}><Copy className="w-3.5 h-3.5" /></Button></div>
                <p className="text-xs text-muted-foreground">⚠️ Nunca partilhes a tua stream key.</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {activeStream ? <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-sm text-green-500">Ligado e a transmitir</span></> : <><AlertCircle className="w-4 h-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Aguarda ligação do OBS/Streamlabs</span></>}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["✂️ Clip rápido", "📊 Poll", "🐢 Slow Mode", "⚔️ Raid"].map((btn) => (
              <Button key={btn} variant="outline" size="sm" className="text-xs h-9" onClick={() => toast.info("Em breve")}>{btn}</Button>
            ))}
          </div>
        </div>

        {/* Right: Chat */}
        <div className="h-[calc(100vh-12rem)] flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="flex-1 text-xs"><MessageSquare className="w-3.5 h-3.5 mr-1.5" />Chat{isConnected && <span className="ml-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />}</TabsTrigger>
              <TabsTrigger value="actividade" className="flex-1 text-xs"><Activity className="w-3.5 h-3.5 mr-1.5" />Actividade</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 flex flex-col border rounded-lg mt-2 overflow-hidden">
              <ScrollArea className="flex-1 p-3">
                {!activeStream ? <div className="text-center py-8"><p className="text-sm text-muted-foreground">Começa o stream para ver o chat</p></div>
                : messages.length === 0 ? <div className="text-center py-8"><p className="text-sm text-muted-foreground">Aguarda mensagens do chat...</p></div>
                : <div className="space-y-2">{messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-1.5 text-xs ${msg.type === "donation" ? "bg-[#F9D616]/10 rounded p-1.5" : msg.type === "system" ? "text-muted-foreground italic" : ""}`}>
                      {msg.type !== "system" && <Avatar className="w-5 h-5 shrink-0 mt-0.5"><AvatarImage src={msg.avatarUrl} /><AvatarFallback className="text-[8px] bg-primary/20 text-primary">{msg.displayName?.slice(0, 1) || msg.username?.slice(0, 1) || "?"}</AvatarFallback></Avatar>}
                      <div className="flex-1 min-w-0"><span className="font-semibold text-foreground/80">{msg.displayName || msg.username}</span>{msg.type === "donation" && <span className="text-[#F9D616] ml-1">💰 {msg.amount} Salos</span>}{" "}<span className="text-foreground/70 break-words">{msg.message}</span></div>
                    </div>
                  ))}<div ref={chatEndRef} /></div>}
              </ScrollArea>
              <div className="p-2 border-t">
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <Input placeholder="Mensagem como streamer..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="h-8 text-xs" disabled={!isConnected || !activeStream} />
                  <Button type="submit" size="icon" className="h-8 w-8 shrink-0" disabled={!chatInput.trim() || !isConnected}><Send className="w-3.5 h-3.5" /></Button>
                </form>
              </div>
            </TabsContent>
            <TabsContent value="actividade" className="flex-1 border rounded-lg mt-2 p-3">
              <div className="text-center py-8"><p className="text-sm text-muted-foreground">Follows, Salos e Raids aparecerão aqui durante o stream.</p></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
