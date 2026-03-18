"use client"

import { Check } from "lucide-react"

interface Step {
  label: string
  href?: string
}

interface StreamSetupStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function StreamSetupSteps({ steps, currentStep, className = "" }: StreamSetupStepsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep
        const isCurrent = i === currentStep
        return (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              isComplete ? "bg-primary text-primary-foreground" :
              isCurrent ? "bg-primary/20 text-primary ring-2 ring-primary" :
              "bg-white/10 text-muted-foreground"
            }`}>
              {isComplete ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-[10px] hidden sm:inline ${isCurrent ? "text-white font-medium" : "text-muted-foreground"}`}>
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div className={`w-6 h-0.5 mx-0.5 rounded ${isComplete ? "bg-primary" : "bg-white/10"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
