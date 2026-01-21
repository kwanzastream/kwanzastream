import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface ModerationAction {
  contentId: string
  contentType: 'stream' | 'message' | 'post' | 'comment'
  action: 'approve' | 'reject' | 'warn' | 'suspend'
  reason?: string
  duration?: number // em horas
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const body: ModerationAction = await request.json()

    const { contentId, contentType, action, reason, duration } = body

    if (!contentId || !contentType || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Verificar se admin
    const { data: userData } = await supabase.auth.getUser(token)
    if (!userData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: adminCheck } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userData.user.id)
      .single()

    if (!adminCheck?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized - admin only' }, { status: 403 })
    }

    // Aplicar ação de moderação
    if (action === 'reject' || action === 'suspend') {
      // Atualizar status do conteúdo
      const updateData: Record<string, any> = {
        status: action === 'reject' ? 'rejected' : 'suspended',
        moderation_notes: reason,
      }

      if (action === 'suspend' && duration) {
        updateData.suspended_until = new Date(Date.now() + duration * 60 * 60 * 1000).toISOString()
      }

      const table = `${contentType}s` // streams, messages, posts, comments
      await supabase.from(table).update(updateData).eq('id', contentId)
    }

    if (action === 'warn' || action === 'suspend') {
      // Registar aviso/suspensão para o user
      const { data: content } = await supabase
        .from(`${contentType}s`)
        .select('user_id')
        .eq('id', contentId)
        .single()

      if (content) {
        await supabase.from('moderation_logs').insert([
          {
            admin_id: userData.user.id,
            user_id: content.user_id,
            action,
            reason,
            content_type: contentType,
            content_id: contentId,
            suspended_until: action === 'suspend' && duration ? new Date(Date.now() + duration * 60 * 60 * 1000).toISOString() : null,
          },
        ])
      }
    }

    // Registar ação de moderação
    const { data: modLog, error: logError } = await supabase
      .from('moderation_logs')
      .insert([
        {
          admin_id: userData.user.id,
          action,
          reason,
          content_type: contentType,
          content_id: contentId,
        },
      ])
      .select()
      .single()

    if (logError) {
      return NextResponse.json(
        { error: 'Failed to log moderation action' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: `Moderation action '${action}' applied successfully`,
        modLog,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Moderation error:', error)
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
    const searchParams = request.nextUrl.searchParams
    const contentType = searchParams.get('contentType')
    const status = searchParams.get('status') || 'flagged'

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

    // Verificar se admin
    const { data: userData } = await supabase.auth.getUser(token)
    const { data: adminCheck } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userData.user?.id || '')
      .single()

    if (!adminCheck?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Obter conteúdo flagado
    let query = supabase.from('moderation_queue').select('*')

    if (contentType) {
      query = query.eq('content_type', contentType)
    }

    query = query.eq('status', status).order('created_at', { ascending: false }).limit(50)

    const { data: flaggedContent, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch flagged content' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        flaggedContent,
        total: flaggedContent?.length || 0,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get moderation queue error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
