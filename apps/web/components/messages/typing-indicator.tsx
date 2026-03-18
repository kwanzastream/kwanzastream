"use client"

export function TypingIndicator({ username }: { username?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1">
      <div className="flex gap-0.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground">{username ? `@${username} está a escrever...` : "A escrever..."}</span>
    </div>
  )
}
