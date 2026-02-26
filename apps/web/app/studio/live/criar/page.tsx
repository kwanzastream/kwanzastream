"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Video, Radio, Upload, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const categories = [
  "Jogos & eSports",
  "Igrejas & Espiritualidade",
  "Educação",
  "Podcasts & Conversas",
  "DJs & Música",
  "Negócios & Empreendedorismo",
  "Arte & Cultura",
  "Comunidade & Vida Local"
]

export default function CreateLivePage() {
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [mode, setMode] = React.useState<"video" | "radio">("video")
  const [streamKey, setStreamKey] = React.useState("ks_live_abc123xyz456")
  const [streamUrl, setStreamUrl] = React.useState("rtmp://stream.kwanza-stream.ao/live")
  const [keyCopied, setKeyCopied] = React.useState(false)
  const [urlCopied, setUrlCopied] = React.useState(false)

  const handleCopyKey = () => {
    navigator.clipboard.writeText(streamKey)
    setKeyCopied(true)
    setTimeout(() => setKeyCopied(false), 2000)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(streamUrl)
    setUrlCopied(true)
    setTimeout(() => setUrlCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular criação de live
    alert("Live criada com sucesso! Podes agora iniciar a transmissão.")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <Link href="/studio">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Studio
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Criar Nova Live</CardTitle>
              <CardDescription>
                Configura os detalhes da tua transmissão ao vivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Live *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Torneio de FIFA 25 - Final"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleciona uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, "-")}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreve o que vais transmitir..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Mode */}
                <div className="space-y-2">
                  <Label>Modo de Transmissão *</Label>
                  <RadioGroup value={mode} onValueChange={(value) => setMode(value as "video" | "radio")}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary cursor-pointer">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Vídeo</p>
                            <p className="text-sm text-muted-foreground">Transmissão com vídeo e áudio</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary cursor-pointer">
                      <RadioGroupItem value="radio" id="radio" />
                      <Label htmlFor="radio" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Radio className="w-5 h-5 text-secondary" />
                          <div>
                            <p className="font-medium">Rádio (Áudio)</p>
                            <p className="text-sm text-muted-foreground">Apenas áudio, sem vídeo</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Thumbnail</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arrasta uma imagem ou clica para fazer upload
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Selecionar Imagem
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Stream Configuration */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Configuração de Stream</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Usa estas credenciais no teu software de streaming (OBS, Streamlabs, etc.)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>URL do Stream (RTMP)</Label>
                    <div className="flex gap-2">
                      <Input value={streamUrl} readOnly className="font-mono text-sm" />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopyUrl}
                      >
                        {urlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chave de Stream</Label>
                    <div className="flex gap-2">
                      <Input value={streamKey} readOnly className="font-mono text-sm" />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCopyKey}
                      >
                        {keyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mantém esta chave em segredo. Não a partilhes publicamente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Criar Live
                  </Button>
                  <Link href="/studio">
                    <Button type="button" variant="outline" size="lg">
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
