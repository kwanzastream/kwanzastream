"use client"

interface CampaignWizardStepsProps {
  currentStep: number
}

const STEPS = [
  { label: "Objectivo", step: 1 },
  { label: "Audiência", step: 2 },
  { label: "Criativo", step: 3 },
  { label: "Orçamento", step: 4 },
  { label: "Revisão", step: 5 },
]

export function CampaignWizardSteps({ currentStep }: CampaignWizardStepsProps) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {STEPS.map((s, i) => (
        <div key={s.step} className="flex items-center flex-1">
          <div className={`flex items-center gap-1.5 ${currentStep >= s.step ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              currentStep > s.step ? "bg-primary text-primary-foreground" :
              currentStep === s.step ? "border-2 border-primary text-primary" :
              "border border-white/20 text-muted-foreground"
            }`}>{currentStep > s.step ? "✓" : s.step}</div>
            <span className="text-[10px] hidden sm:block">{s.label}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${currentStep > s.step ? "bg-primary" : "bg-white/10"}`} />}
        </div>
      ))}
    </div>
  )
}
