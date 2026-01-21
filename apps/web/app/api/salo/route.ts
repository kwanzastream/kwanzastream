import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const PLATFORM_FEE = 0.2

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const { fromUser, toCreator, amount, streamId } = await req.json()

    if (!fromUser || !toCreator || !amount || !streamId) {
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

    // Verificar se o fromUser corresponde ao usuário autenticado
    if (userData.user.id !== fromUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verificar saldo do sender
    const { data: senderWallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', fromUser)
      .single()

    if (walletError || !senderWallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    if (senderWallet.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Calcular valores
    const platformCut = amount * PLATFORM_FEE
    const creatorAmount = amount - platformCut

    // Chamar função Postgres para transação atômica
    const { error } = await supabase.rpc('send_salo', {
      sender_id: fromUser,
      receiver_id: toCreator,
      stream_id: streamId,
      amount,
      platform_fee: platformCut,
      creator_amount: creatorAmount
    })

    if (error) {
      console.error('Send salo RPC error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send salo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
