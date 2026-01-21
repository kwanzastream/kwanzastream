"use client"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { CardDescription } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, ChevronLeft, CheckCircle2, ShieldCheck, Upload, HelpCircle } from "lucide-react"
import Link from "next/link"

const reportReasons = [
  { id: "spam", label: "Spam ou publicidade enganosa" },
  { id: "sexual", label: "Nudez ou conteúdo sexual" },
  { id: "hate", label: "Discurso de ódio ou símbolos de ódio" },
  { id: "violence", label: "Violência ou organizações perigosas" },
  { id: "illegal", label: "Venda de itens ilegais ou regulamentados" },
  { id: "bullying", label: "Bullying ou assédio" },
  { id: "ip", label: "Violação de propriedade intelectual" },
  { id: "suicide", label: "Conteúdo suicida ou autolesão" },
  { id: "false", label: "Informação falsa" },
  { id: "other", label: "Outro" },
]

export default function ReportPage() {
  const [step, setStep] = React.useState(1)
  const [reason, setReason] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)
  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-[500px] w-full border-primary/20 bg-white/5 backdrop-blur-xl text-center py-10">
          <CardContent className="space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Denúncia Enviada</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Obrigado por nos ajudar a manter a Kwanza Stream segura. A nossa equipa de moderação irá analisar o
                conteúdo o mais breve possível.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Número de Referência</p>
              <p className="text-lg font-black text-primary">#KS-849201</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/feed">
              <Button className="bg-primary hover:bg-primary/90 text-white font-black px-10 rounded-xl h-12">
                Fechar
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 angola-pattern">
      <div className="max-w-[550px] w-full space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Link href="/feed">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-black uppercase tracking-tighter">Denunciar Conteúdo</h1>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-6 rounded-full transition-all ${step >= s ? "bg-primary" : "bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        <Card className="border-white/10 bg-card/50 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              {step === 1 && "Porquê estás a denunciar isto?"}
              {step === 2 && "Mais detalhes sobre o problema"}
              {step === 3 && "Confirmar e Enviar"}
            </CardTitle>
            <CardDescription className="text-sm">
              {step === 1 && "Seleciona o motivo que melhor descreve a violação."}
              {step === 2 && "Ajuda-nos a entender melhor o contexto."}
              {step === 3 && "Revisa as informações antes de submeter."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 min-h-[350px]">
            {step === 1 && (
              <ScrollArea className="h-[350px] pr-4">
                <RadioGroup value={reason} onValueChange={setReason} className="gap-0">
                  {reportReasons.map((r) => (
                    <Label
                      key={r.id}
                      htmlFor={r.id}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all border border-transparent ${reason === r.id ? "bg-primary/5 border-primary/20" : ""}`}
                    >
                      <span className="text-sm font-medium">{r.label}</span>
                      <RadioGroupItem value={r.id} id={r.id} />
                    </Label>
                  ))}
                </RadioGroup>
              </ScrollArea>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="details"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Descreve o problema (opcional)
                  </Label>
                  <textarea
                    id="details"
                    className="min-h-[120px] w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Diz-nos mais sobre o que aconteceu..."
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="block" className="border-white/20" />
                    <Label htmlFor="block" className="text-sm font-medium">
                      Bloquear este utilizador
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="similar" className="border-white/20" />
                    <Label htmlFor="similar" className="text-sm font-medium">
                      Não quero ver conteúdo semelhante
                    </Label>
                  </div>
                </div>

                <div className="pt-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Evidência (opcional)
                  </Label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 transition-all cursor-pointer">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">Clica para carregar captura de ecrã</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h4 className="font-bold text-sm">O que acontece depois?</h4>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-3 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />A nossa equipa analisa a
                      denúncia em até 24 horas.
                    </li>
                    <li className="flex gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />A tua denúncia é{" "}
                      <span className="text-foreground font-bold italic">totalmente anónima</span>.
                    </li>
                    <li className="flex gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Poderemos remover o conteúdo ou restringir a conta se houver violação.
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
                  <HelpCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Ao submeteres esta denúncia, confirmas que as informações são verdadeiras. Denúncias falsas
                    recorrentes podem levar a restrições na tua própria conta.
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-3 pt-6 border-t border-white/5">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 font-bold h-12 rounded-xl"
              >
                Voltar
              </Button>
            )}
            {step < 3 ? (
              <Button
                disabled={!reason}
                onClick={handleNext}
                className="flex-[2] bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl shadow-lg shadow-primary/20"
              >
                Continuar
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex-[2] bg-primary hover:bg-primary/90 text-white font-black h-12 rounded-xl shadow-lg shadow-primary/20"
              >
                Enviar Denúncia
              </Button>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          Kwanza Stream Security • 2025
        </p>
      </div>
    </div>
  )
}
