import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

interface SendSaloRequest {
  saloType: 'paozinho' | 'gasosa' | 'rei' | 'premium' | 'diamante'
  receiverUserId: string
  streamId: string
  quantity: number
}

const SALO_PRICES: Record<string, number> = {
  paozinho: 50,
  gasosa: 500,
  rei: 5000,
  premium: 20000,
  diamante: 100000,
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const body: SendSaloRequest = await request.json()

    const { saloType, receiverUserId, streamId, quantity } = body

    if (!saloType || !receiverUserId || !streamId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!SALO_PRICES[saloType]) {
      return NextResponse.json(
        { error: 'Invalid Salo type' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Handle errors
            }
          },
        },
      }
    )

    // Obter user atual
    const { data: userData, error: userError } = await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const senderId = userData.user.id
    const saloPrice = SALO_PRICES[saloType]
    const totalCost = saloPrice * quantity

    // Obter wallet do sender
    const { data: senderWallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', senderId)
      .single()

    if (walletError || !senderWallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    if (senderWallet.balance < totalCost) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Calcular valores (20% taxa plataforma conforme especificado)
    const PLATFORM_FEE = 0.2
    const platformCut = totalCost * PLATFORM_FEE
    const creatorAmount = totalCost - platformCut

    // Usar função Postgres para transação atômica
    const { error: rpcError } = await supabase.rpc('send_salo', {
      sender_id: senderId,
      receiver_id: receiverUserId,
      stream_id: streamId,
      amount: totalCost,
      platform_fee: platformCut,
      creator_amount: creatorAmount
    })

    if (rpcError) {
      console.error('Send salo RPC error:', rpcError)
      return NextResponse.json({ error: rpcError.message }, { status: 400 })
    }

    // Registrar na tabela salos (se existir) para histórico
    const { data: saloTransaction } = await supabase
      .from('salos')
      .insert([
        {
          sender_id: senderId,
          stream_id: streamId,
          salo_type_id: null, // Pode precisar buscar o ID do tipo
          quantity,
          total_amount: totalCost,
        },
      ])
      .select()
      .single()

    return NextResponse.json(
      {
        message: 'Salo sent successfully',
        creatorEarnings: creatorAmount,
        platformFee: platformCut,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Send Salo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
