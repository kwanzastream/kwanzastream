"use client"
import Link from "next/link"
interface ReferralLandingHeroProps { referrerName: string; code: string }
export function ReferralLandingHero({ referrerName, code }: ReferralLandingHeroProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="text-4xl">🇦🇴</div>
        <h1 className="text-xl font-black">Kwanza Stream</h1>
        <div className="space-y-2"><div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl mx-auto">👤</div><p className="text-xs text-muted-foreground">@{referrerName} convidou-te!</p></div>
        <div><h2 className="text-lg font-bold">Junta-te ao Kwanza Stream</h2><p className="text-xs text-muted-foreground">A plataforma de streaming de Angola</p></div>
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/10"><p className="text-xs">🎁 Ao registares-te com este convite:</p><p className="text-sm font-bold text-primary mt-1">Ganhas 100 Salos grátis</p></div>
        <Link href={`/registar?ref=${code}`} className="block w-full py-3 rounded-xl bg-primary text-white text-sm font-bold">Criar conta grátis →</Link>
        <p className="text-[10px] text-muted-foreground">Já tens conta? <Link href="/entrar" className="text-primary hover:underline">Iniciar sessão</Link></p>
      </div>
    </div>
  )
}
