import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'day' // day, week, month
    const userId = searchParams.get('userId')

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

    let targetUserId = userId
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const { data: userData } = await supabase.auth.getUser(token)
      if (!userId && userData.user) {
        targetUserId = userData.user.id
      }
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'User ID or authentication required' },
        { status: 400 }
      )
    }

    // Calcular período
    const now = new Date()
    let startDate = new Date()

    if (period === 'day') {
      startDate.setDate(startDate.getDate() - 1)
    } else if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7)
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1)
    }

    // Obter estatísticas gerais
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('display_name, is_creator, followers_count')
      .eq('id', targetUserId)
      .single()

    // Streams count e viewers
    const { data: streamsData, count: streamCount } = await supabase
      .from('streams')
      .select('id, viewer_count', { count: 'exact', head: false })
      .eq('creator_id', targetUserId)
      .gte('started_at', startDate.toISOString())

    const totalViewers = streamsData?.reduce((sum, s) => sum + (s.viewer_count || 0), 0) || 0

    // Transações
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', targetUserId)
      .gte('created_at', startDate.toISOString())

    const totalRevenue = transactions?.reduce((sum, t) => {
      if (t.type === 'salo_received' || t.type === 'deposit') {
        return sum + t.amount
      }
      return sum
    }, 0) || 0

    const totalSpent = transactions?.reduce((sum, t) => {
      if (t.type === 'salo_sent' || t.type === 'withdrawal') {
        return sum + t.amount
      }
      return sum
    }, 0) || 0

    // Salos recebidos
    const { data: salosReceived } = await supabase
      .from('salo_transactions')
      .select('quantity, salo_type')
      .eq('receiver_id', targetUserId)
      .gte('created_at', startDate.toISOString())

    const saloBreakdown: Record<string, number> = {}
    salosReceived?.forEach((s) => {
      saloBreakdown[s.salo_type] = (saloBreakdown[s.salo_type] || 0) + s.quantity
    })

    return NextResponse.json(
      {
        user: {
          id: targetUserId,
          displayName: userProfile?.display_name,
          isCreator: userProfile?.is_creator,
          followers: userProfile?.followers_count || 0,
        },
        analytics: {
          period,
          startDate: startDate.toISOString(),
          endDate: now.toISOString(),
          stats: {
            streams: streamCount || 0,
            totalViewers,
            totalRevenue,
            totalSpent,
            transactionCount: transactions?.length || 0,
            avgRevenuePerStream: streamCount ? Math.round(totalRevenue / streamCount) : 0,
          },
          saloBreakdown,
          transactions: transactions?.slice(0, 20),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
