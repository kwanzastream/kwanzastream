import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Função para gerar stream key (usando nanoid se disponível, senão fallback)
function generateStreamKey(): string {
  // Se nanoid estiver disponível, usar. Senão, usar crypto.randomUUID
  if (typeof window === 'undefined') {
    try {
      // Tentar importar nanoid dinamicamente
      const { nanoid } = require('nanoid')
      return nanoid(24)
    } catch {
      // Fallback para crypto se nanoid não estiver disponível
      const crypto = require('crypto')
      return crypto.randomBytes(18).toString('base64url').substring(0, 24)
    }
  }
  // No browser, usar crypto.randomUUID
  return crypto.randomUUID().replace(/-/g, '').substring(0, 24)
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const { creatorId, title, category } = await req.json()

    if (!creatorId || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verificar autenticação
    const { data: userData, error: userError } = await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar se o creatorId corresponde ao usuário autenticado
    if (userData.user.id !== creatorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const streamKey = generateStreamKey()

    const { error } = await supabase.from('streams').insert({
      creator_id: creatorId,
      title,
      category,
      stream_key: streamKey,
      is_live: true,
      status: 'live',
      started_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Stream creation error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ streamKey })
  } catch (error) {
    console.error('Stream creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
