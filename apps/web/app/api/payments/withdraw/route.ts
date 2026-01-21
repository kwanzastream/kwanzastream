import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface WithdrawalRequest {
  amount: number
  paymentMethod: 'multicaixa' | 'unitel_money' | 'bank_transfer'
  phoneNumber?: string
  accountNumber?: string
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const body: WithdrawalRequest = await request.json()

    const { amount, paymentMethod, phoneNumber, accountNumber } = body

    if (!amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Amount and payment method are required' },
        { status: 400 }
      )
    }

    if (amount < 5000) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is 5000 Kz' },
        { status: 400 }
      )
    }

    if (amount > 5000000) {
      return NextResponse.json(
        { error: 'Maximum withdrawal amount is 5000000 Kz' },
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

    // Obter wallet
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userData.user.id)
      .single()

    if (walletError || !wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    if (wallet.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Verificar limite de saques por dia
    const today = new Date().toISOString().split('T')[0]
    const { data: todayWithdrawals } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', userData.user.id)
      .eq('type', 'withdrawal')
      .like('created_at', `${today}%`)

    const dailyTotal = (todayWithdrawals || []).reduce((sum, t) => sum + t.amount, 0)
    if (dailyTotal + amount > 10000000) {
      return NextResponse.json(
        { error: 'Daily withdrawal limit exceeded (10,000,000 Kz)' },
        { status: 400 }
      )
    }

    // Criar withdrawal request
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from('withdrawals')
      .insert([
        {
          user_id: userData.user.id,
          amount,
          payment_method: paymentMethod,
          phone_number: phoneNumber,
          account_number: accountNumber,
          status: 'pending',
          requested_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (withdrawalError) {
      return NextResponse.json(
        { error: 'Failed to create withdrawal' },
        { status: 500 }
      )
    }

    // Debitar wallet (saldo fica como "em processo")
    await supabase
      .from('wallets')
      .update({
        balance: wallet.balance - amount,
      })
      .eq('user_id', userData.user.id)

    // Registar transação
    await supabase.from('transactions').insert([
      {
        user_id: userData.user.id,
        type: 'withdrawal',
        amount,
        description: `Saque de ${amount} Kz via ${paymentMethod}`,
        status: 'pending',
        metadata: {
          withdrawal_id: withdrawal.id,
          payment_method: paymentMethod,
        },
      },
    ])

    // TODO: Integrar com Stripe ou API de pagamento real
    // TODO: Enviar confirmação via email/SMS
    // TODO: Agendar confirmação automática após 24h (para Multicaixa)

    return NextResponse.json(
      {
        message: 'Withdrawal request created successfully',
        withdrawal,
        status: 'pending',
        expectedTime: '24-48 hours',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Withdrawal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)

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

    // Obter user
    const { data: userData, error: userError } = await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Obter histórico de saques
    const { data: withdrawals, error: withdrawalError } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('requested_at', { ascending: false })
      .limit(20)

    if (withdrawalError) {
      return NextResponse.json(
        { error: 'Failed to fetch withdrawals' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        withdrawals,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fetch withdrawals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
