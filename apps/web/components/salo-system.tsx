'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Gift, Loader2, X, AlertCircle } from 'lucide-react'
import { donationService } from '@/lib/services'
import { useAuth } from '@/lib/auth-context'

interface SaloSystemProps {
  receiverId: string;
  streamId?: string;
  receiverName?: string;
  onDonationSent?: (donation: any) => void;
  onClose?: () => void;
  compact?: boolean;
}

interface SaloType {
  key: string;
  name: string;
  emoji: string;
  price: number;
  color: string;
  tier: string;
}

const SALO_DISPLAY: SaloType[] = [
  { key: 'bronze', name: 'Salo Bronze', emoji: '🥖', price: 100, color: 'from-amber-500 to-orange-500', tier: 'Bronze' },
  { key: 'silver', name: 'Salo Prata', emoji: '🍻', price: 500, color: 'from-slate-400 to-slate-500', tier: 'Prata' },
  { key: 'gold', name: 'Salo Ouro', emoji: '💵', price: 1000, color: 'from-yellow-500 to-yellow-400', tier: 'Ouro' },
  { key: 'diamond', name: 'Salo Diamante', emoji: '💎', price: 5000, color: 'from-blue-500 to-purple-500', tier: 'Diamante' },
  { key: 'legendary', name: 'Salo Lendário', emoji: '👑', price: 10000, color: 'from-purple-600 to-pink-600', tier: 'Lendário' },
]

const tierColors: Record<string, string> = {
  Bronze: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  Prata: 'bg-slate-400/20 text-slate-300 border-slate-400/50',
  Ouro: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  Diamante: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  'Lendário': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
}

export function SaloSystem({ receiverId, streamId, receiverName, onDonationSent, onClose, compact = false }: SaloSystemProps) {
  const { isLoggedIn } = useAuth()
  const [selectedSalo, setSelectedSalo] = React.useState<SaloType | null>(null)
  const [message, setMessage] = React.useState('')
  const [isSending, setIsSending] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  const handleSend = async () => {
    if (!selectedSalo || !isLoggedIn) return
    setIsSending(true)
    setError('')
    setSuccess('')

    try {
      const res = await donationService.send({
        receiverId,
        saloType: selectedSalo.key,
        message: message.trim() || undefined,
        streamId,
      })

      setSuccess(`${selectedSalo.emoji} ${selectedSalo.name} enviado!`)
      setSelectedSalo(null)
      setMessage('')
      onDonationSent?.(res.data.donation)

      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Erro ao enviar salo'
      setError(msg)
    } finally {
      setIsSending(false)
    }
  }

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Compact Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {SALO_DISPLAY.map((salo) => (
            <button
              key={salo.key}
              onClick={() => setSelectedSalo(salo.key === selectedSalo?.key ? null : salo)}
              className={`flex flex-col items-center p-2 rounded-lg border transition-all text-center ${selectedSalo?.key === salo.key
                  ? 'border-primary bg-primary/10 scale-105'
                  : 'border-white/10 hover:border-white/30 bg-white/5'
                }`}
            >
              <span className="text-2xl">{salo.emoji}</span>
              <span className="text-[10px] font-bold mt-1">{salo.price} Kz</span>
            </button>
          ))}
        </div>

        {/* Selected Salo Actions */}
        {selectedSalo && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Mensagem para ${receiverName || 'streamer'}...`}
              className="bg-white/5 border-white/10 h-8 text-xs"
              maxLength={200}
            />
            <Button
              onClick={handleSend}
              disabled={isSending}
              size="sm"
              className={`w-full gap-2 bg-gradient-to-r ${selectedSalo.color} text-white font-bold`}
            >
              {isSending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Gift className="h-3 w-3" />}
              Enviar {selectedSalo.name} ({selectedSalo.price} Kz)
            </Button>
          </div>
        )}

        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> {error}
          </p>
        )}
        {success && (
          <p className="text-xs text-green-400 font-bold animate-in fade-in">{success}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h3 className="font-bold">Enviar Salo</h3>
          {receiverName && (
            <span className="text-sm text-muted-foreground">para {receiverName}</span>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Salo Grid */}
      <div className="grid grid-cols-5 gap-2">
        {SALO_DISPLAY.map((salo) => (
          <Card
            key={salo.key}
            onClick={() => setSelectedSalo(salo.key === selectedSalo?.key ? null : salo)}
            className={`cursor-pointer transition-all overflow-hidden ${selectedSalo?.key === salo.key
                ? 'border-primary ring-1 ring-primary scale-[1.02]'
                : 'border-white/10 hover:border-white/30 bg-card/50'
              }`}
          >
            <CardContent className="p-3 text-center space-y-2">
              <div className="text-3xl">{salo.emoji}</div>
              <p className="text-xs font-bold truncate">{salo.name}</p>
              <Badge variant="outline" className={`${tierColors[salo.tier]} border text-[10px] w-full justify-center`}>
                {salo.tier}
              </Badge>
              <p className="text-lg font-black text-accent">{salo.price.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Kz</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message + Send */}
      {selectedSalo && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Mensagem (opcional) para ${receiverName || 'o streamer'}...`}
            className="bg-white/5 border-white/10"
            maxLength={200}
          />
          <Button
            onClick={handleSend}
            disabled={isSending}
            className={`w-full gap-2 bg-gradient-to-r ${selectedSalo.color} text-white font-bold h-12 text-base`}
          >
            {isSending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> A enviar...</>
            ) : (
              <><Gift className="h-4 w-4" /> Enviar {selectedSalo.name} — {selectedSalo.price.toLocaleString()} Kz</>
            )}
          </Button>
        </div>
      )}

      {/* Feedback */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      {success && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center animate-in fade-in">
          <p className="text-sm font-bold text-green-300">{success}</p>
        </div>
      )}
    </div>
  )
}
