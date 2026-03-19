"use client"

/**
 * Single-elimination bracket rendered as HTML/CSS grid.
 * No heavy libraries (D3, cytoscape) — mobile-first for Angola.
 */

interface BracketMatch {
  id: string
  round: number
  position: number
  p1: string | null
  p2: string | null
  winner: string | null
  score?: string
  isLive?: boolean
}

interface TournamentBracketProps {
  matches: BracketMatch[]
  rounds: number
}

export function TournamentBracket({ matches, rounds }: TournamentBracketProps) {
  const roundNames = ["R1", "R2", "Quartos", "Semis", "Final"]

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max">
        {Array.from({ length: rounds }, (_, r) => {
          const roundMatches = matches.filter(m => m.round === r + 1).sort((a, b) => a.position - b.position)
          return (
            <div key={r} className="flex flex-col gap-4 justify-center" style={{ minWidth: 180 }}>
              <h4 className="text-[10px] font-bold text-muted-foreground text-center mb-2">{roundNames[r] || `R${r + 1}`}</h4>
              {roundMatches.map(m => (
                <div key={m.id} className={`rounded-xl border transition-all ${m.isLive ? "border-red-500/30 bg-red-500/5" : "border-white/10 bg-white/[0.02]"}`}>
                  {m.isLive && <div className="text-[8px] text-red-400 font-bold text-center py-0.5 animate-pulse">🔴 AO VIVO</div>}
                  <div className={`flex items-center justify-between px-3 py-2 text-xs ${m.winner === m.p1 ? "font-bold text-primary" : "text-muted-foreground"}`}>
                    <span className="truncate">{m.p1 || "TBD"}</span>
                    {m.score && <span className="text-[9px] font-mono">{m.score.split("-")[0]}</span>}
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className={`flex items-center justify-between px-3 py-2 text-xs ${m.winner === m.p2 ? "font-bold text-primary" : "text-muted-foreground"}`}>
                    <span className="truncate">{m.p2 || "TBD"}</span>
                    {m.score && <span className="text-[9px] font-mono">{m.score.split("-")[1]}</span>}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Default mock bracket data
export const MOCK_BRACKET: BracketMatch[] = [
  { id: "m1", round: 1, position: 1, p1: "Team Alpha", p2: "Team Beta", winner: "Team Alpha", score: "2-0" },
  { id: "m2", round: 1, position: 2, p1: "Team Gamma", p2: "Team Delta", winner: "Team Gamma", score: "2-1" },
  { id: "m3", round: 1, position: 3, p1: "Team Epsilon", p2: "Team Zeta", winner: "Team Zeta", score: "0-2" },
  { id: "m4", round: 1, position: 4, p1: "Team Eta", p2: "Team Theta", winner: "Team Eta", score: "2-1", isLive: true },
  { id: "m5", round: 2, position: 1, p1: "Team Alpha", p2: "Team Gamma", winner: null, score: undefined },
  { id: "m6", round: 2, position: 2, p1: "Team Zeta", p2: null, winner: null, score: undefined },
  { id: "m7", round: 3, position: 1, p1: null, p2: null, winner: null, score: undefined },
]
