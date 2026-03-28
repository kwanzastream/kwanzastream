"use client"

import { useState } from "react"
import { GraduationCap, BookOpen, Trophy, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

const MODULES = [
  { id: 1, title: "Introdução ao Streaming", lessons: 5, completed: 5, icon: "📺" },
  { id: 2, title: "Configurar o teu Canal", lessons: 4, completed: 4, icon: "⚙️" },
  { id: 3, title: "Interagir com a Audiência", lessons: 6, completed: 3, icon: "💬" },
  { id: 4, title: "Monetização", lessons: 5, completed: 0, icon: "💰" },
  { id: 5, title: "Crescimento do Canal", lessons: 4, completed: 0, icon: "📈" },
  { id: 6, title: "Parcerias e Sponsorships", lessons: 3, completed: 0, icon: "🤝" },
]

export default function KwanzaCampProgressoPage() {
  const totalLessons = MODULES.reduce((a, m) => a + m.lessons, 0)
  const completedLessons = MODULES.reduce((a, m) => a + m.completed, 0)
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Kwanza Camp — Progresso</h1>
        <p className="text-sm text-muted-foreground mt-1">O teu percurso de aprendizagem como creator.</p>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{completedLessons}/{totalLessons} lições completas</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Trophy className="w-3 h-3 text-yellow-500" />
          <span>{progress >= 100 ? "Parabéns! Campus completado!" : `Faltam ${totalLessons - completedLessons} lições para o certificado`}</span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {MODULES.map((mod) => {
          const modProgress = Math.round((mod.completed / mod.lessons) * 100)
          const isDone = mod.completed === mod.lessons
          return (
            <div key={mod.id} className={`p-4 rounded-xl border transition-colors ${isDone ? "border-green-500/20 bg-green-500/5" : "border-white/10 hover:border-primary/30"}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium flex items-center gap-2">
                    {mod.title}
                    {isDone && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{mod.completed}/{mod.lessons} lições · {modProgress}%</p>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${isDone ? "bg-green-500" : "bg-primary"}`} style={{ width: `${modProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
