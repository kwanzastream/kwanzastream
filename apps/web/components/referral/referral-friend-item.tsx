"use client"
interface ReferralFriendItemProps { username?: string; status: "completed" | "pending"; date: string; salos?: number }
export function ReferralFriendItem({ username, status, date, salos }: ReferralFriendItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs">{status === "completed" ? "✅" : "⏳"}</div>
        <div>{username ? <p className="text-xs font-semibold">@{username}</p> : <p className="text-xs text-muted-foreground">Pendente</p>}<p className="text-[9px] text-muted-foreground">{status === "completed" ? `Registou-se ${date}` : `Link partilhado ${date}`}</p></div>
      </div>
      {salos && <span className="text-[10px] text-primary font-bold">+{salos} Salos</span>}
    </div>
  )
}
