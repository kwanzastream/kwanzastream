"use client"

import { useEffect, useState } from "react"

interface OtpCooldownTimerProps {
    /** Initial seconds remaining in the cooldown */
    initialSeconds: number
    /** Called when countdown reaches zero */
    onComplete: () => void
}

export function OtpCooldownTimer({ initialSeconds, onComplete }: OtpCooldownTimerProps) {
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        setSeconds(initialSeconds)
    }, [initialSeconds])

    useEffect(() => {
        if (seconds <= 0) {
            onComplete()
            return
        }

        const timer = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    onComplete()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [seconds, onComplete])

    const progress = ((initialSeconds - seconds) / initialSeconds) * 100

    return (
        <div className="flex flex-col items-center gap-2 py-2">
            {/* Circular countdown */}
            <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    {/* Background circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-white/10"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000 ease-linear"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
                    {seconds}s
                </span>
            </div>
            <p className="text-xs text-muted-foreground">
                Podes reenviar em {seconds} segundo{seconds !== 1 ? "s" : ""}
            </p>
        </div>
    )
}
