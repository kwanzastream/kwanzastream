"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Image, Link as LinkIcon, MessageSquare, Shield, Upload, Trash2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChannelSettingsPage() {
  const [channelName, setChannelName] = React.useState("Meu Canal")
  const [channelDescription, setChannelDescription] = React.useState("Descrição do canal...")
  const [bannerUrl, setBannerUrl] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState("/abstract-profile.png")
  
  const [externalLinks, setExternalLinks] = React.useState([
    { id: "1", label: "Website", url: "https://exemplo.com" },
    { id: "2", label: "Instagram", url: "https://instagram.com/exemplo" }
  ])

  const [bannedWords, setBannedWords] = React.useState(["palavra1", "palavra2"])
  const [newBannedWord, setNewBannedWord] = React.useState("")

  const [chatRules, setChatRules] = React.useState({
    slowMode: false,
    slowModeDelay: 5,
    subscriberOnly: false,
    followerOnly: false,
    emoteOnly: false
  })

  const handleAddLink = () => {
    setExternalLinks([...externalLinks, { id: Date.now().toString(), label: "", url: "" }])
  }

  const handleRemoveLink = (id: string) => {
    setExternalLinks(externalLinks.filter(link => link.id !== id))
  }

  const handleAddBannedWord = () => {
    if (newBannedWord.trim()) {
      setBannedWords([...bannedWords, newBannedWord.trim()])
      setNewBannedWord("")
    }
  }

  const handleRemoveBannedWord = (word: string) => {
    setBannedWords(bannedWords.filter(w => w !== word))
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

          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
              Configurações do Canal
            </h1>
            <p className="text-muted-foreground">
              Personaliza o branding e comportamento do teu canal
            </p>
          </div>

          <Tabs defaultValue="branding" className="space-y-6">
            <TabsList>
              <TabsTrigger value="branding">
                <Image className="w-4 h-4 mr-2" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="links">
                <LinkIcon className="w-4 h-4 mr-2" />
                Links Externos
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="w-4 h-4 mr-2" />
                Regras do Chat
              </TabsTrigger>
              <TabsTrigger value="moderation">
                <Shield className="w-4 h-4 mr-2" />
                Moderação
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Identidade Visual</CardTitle>
                  <CardDescription>
                    Personaliza a aparência do teu canal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="space-y-4">
                    <Label>Foto de Perfil</Label>
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback className="text-2xl">{channelName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Alterar Foto
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Banner */}
                  <div className="space-y-4">
                    <Label>Banner do Canal</Label>
                    <div className="relative w-full h-32 bg-muted rounded-lg border-2 border-dashed flex items-center justify-center">
                      {bannerUrl ? (
                        <div className="relative w-full h-full">
                          <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover rounded-lg" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => setBannerUrl("")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Banner recomendado: 1920x480px
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Fazer Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Channel Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel-name">Nome do Canal *</Label>
                      <Input
                        id="channel-name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Nome do teu canal"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="channel-description">Descrição do Canal</Label>
                      <Textarea
                        id="channel-description"
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                        placeholder="Descreve o teu canal..."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        {channelDescription.length}/500 caracteres
                      </p>
                    </div>
                  </div>

                  <Button>Guardar Alterações</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Links Externos</CardTitle>
                  <CardDescription>
                    Adiciona links para redes sociais, website e outros recursos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {externalLinks.map((link, index) => (
                    <div key={link.id} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-2">
                        <Label>Rótulo</Label>
                        <Input
                          placeholder="Ex: Instagram, Website"
                          value={link.label}
                          onChange={(e) => {
                            const updated = [...externalLinks]
                            updated[index].label = e.target.value
                            setExternalLinks(updated)
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>URL</Label>
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={link.url}
                          onChange={(e) => {
                            const updated = [...externalLinks]
                            updated[index].url = e.target.value
                            setExternalLinks(updated)
                          }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveLink(link.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleAddLink} className="w-full">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Adicionar Link
                  </Button>
                  <Button>Guardar Links</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regras do Chat</CardTitle>
                  <CardDescription>
                    Configura como os espectadores podem interagir no chat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Modo Lento</Label>
                      <p className="text-sm text-muted-foreground">
                        Limita a frequência de mensagens dos espectadores
                      </p>
                    </div>
                    <Switch
                      checked={chatRules.slowMode}
                      onCheckedChange={(checked) =>
                        setChatRules({ ...chatRules, slowMode: checked })
                      }
                    />
                  </div>

                  {chatRules.slowMode && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="slow-delay">Intervalo (segundos)</Label>
                      <Input
                        id="slow-delay"
                        type="number"
                        min="3"
                        max="120"
                        value={chatRules.slowModeDelay}
                        onChange={(e) =>
                          setChatRules({
                            ...chatRules,
                            slowModeDelay: parseInt(e.target.value) || 5
                          })
                        }
                        className="w-32"
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Apenas Subscritores</Label>
                      <p className="text-sm text-muted-foreground">
                        Apenas subscritores podem enviar mensagens
                      </p>
                    </div>
                    <Switch
                      checked={chatRules.subscriberOnly}
                      onCheckedChange={(checked) =>
                        setChatRules({ ...chatRules, subscriberOnly: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Apenas Seguidores</Label>
                      <p className="text-sm text-muted-foreground">
                        Apenas seguidores podem enviar mensagens
                      </p>
                    </div>
                    <Switch
                      checked={chatRules.followerOnly}
                      onCheckedChange={(checked) =>
                        setChatRules({ ...chatRules, followerOnly: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Apenas Emotes</Label>
                      <p className="text-sm text-muted-foreground">
                        Apenas permite emotes no chat (sem texto)
                      </p>
                    </div>
                    <Switch
                      checked={chatRules.emoteOnly}
                      onCheckedChange={(checked) =>
                        setChatRules({ ...chatRules, emoteOnly: checked })
                      }
                    />
                  </div>

                  <Button>Guardar Regras</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Palavras Proibidas</CardTitle>
                  <CardDescription>
                    Mensagens contendo estas palavras serão automaticamente bloqueadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Adicionar palavra proibida"
                      value={newBannedWord}
                      onChange={(e) => setNewBannedWord(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddBannedWord()
                        }
                      }}
                    />
                    <Button onClick={handleAddBannedWord}>Adicionar</Button>
                  </div>

                  {bannedWords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {bannedWords.map((word) => (
                        <Badge
                          key={word}
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          {word}
                          <button
                            onClick={() => handleRemoveBannedWord(word)}
                            className="hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhuma palavra proibida configurada
                    </p>
                  )}

                  <Button>Guardar Palavras Proibidas</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Auto-Moderação</CardTitle>
                  <CardDescription>
                    Configurações automáticas de moderação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Bloquear Links</Label>
                      <p className="text-sm text-muted-foreground">
                        Bloqueia automaticamente mensagens com links
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Bloquear CAPS</Label>
                      <p className="text-sm text-muted-foreground">
                        Bloqueia mensagens escritas apenas em maiúsculas
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label>Filtro de Spam</Label>
                      <p className="text-sm text-muted-foreground">
                        Detecta e bloqueia mensagens repetitivas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button>Guardar Configurações</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
