import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Contar usuários
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })

    if (usersError) {
      console.error('Users count error:', usersError)
    }

    // Obter volume de transações
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('amount')

    if (transactionsError) {
      console.error('Transactions error:', transactionsError)
    }

    // Calcular volume total
    const total = transactions?.reduce((a, b) => a + (parseFloat(b.amount) || 0), 0) || 0

    return NextResponse.json({
      users: usersCount || 0,
      transactionVolume: total
    })
  } catch (error) {
    console.error('Admin analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
