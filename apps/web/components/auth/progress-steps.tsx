import Link from "next/link"
import { Check } from "lucide-react"

interface ProgressStepsProps {
  steps: { label: string; href?: string }[]
  currentStep: number        // 0-indexed
  allowNavigation?: boolean  // previous steps clickable
}

export function ProgressSteps({ steps, currentStep, allowNavigation = false }: ProgressStepsProps) {
  return (
    <div className="w-full">
      {/* Step labels on top */}
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Passo {currentStep + 1} de {steps.length}</span>
        <span className="font-medium text-foreground">{steps[currentStep]?.label}</span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {steps.map((step, i) => {
          const isComplete = i < currentStep
          const isCurrent = i === currentStep
          const isClickable = allowNavigation && isComplete && step.href

          const bar = (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                isComplete ? "bg-primary" : isCurrent ? "bg-primary/60" : "bg-muted"
              }`}
            />
          )

          if (isClickable) {
            return (
              <Link key={i} href={step.href!} className="flex-1">
                {bar}
              </Link>
            )
          }

          return bar
        })}
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-1.5">
        {steps.map((step, i) => {
          const isComplete = i < currentStep
          const isCurrent = i === currentStep

          return (
            <div key={i} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                isComplete
                  ? "bg-primary text-primary-foreground"
                  : isCurrent
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
              }`}>
                {isComplete ? <Check className="w-3 h-3" /> : i + 1}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
