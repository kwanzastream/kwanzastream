import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface UpdateViewerRequest {
  streamId: string
  action: 'join' | 'leave'
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    const sessionId = request.headers.get('X-Session-ID')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const body: UpdateViewerRequest = await request.json()
    const { streamId, action } = body

    if (!streamId || !action) {
      return NextResponse.json(
        { error: 'Stream ID and action are required' },
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

    // Obter user se autenticado
    let userId = null
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const { data: userData } = await supabase.auth.getUser(token)
      userId = userData.user?.id
    }

    // Verificar se stream existe
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('id, viewer_count')
      .eq('id', streamId)
      .single()

    if (streamError || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    if (action === 'join') {
      // Registar viewer
      const { error: viewerError } = await supabase
        .from('stream_viewers')
        .insert([
          {
            stream_id: streamId,
            user_id: userId,
            session_id: sessionId,
            joined_at: new Date().toISOString(),
          },
        ])

      if (viewerError && !viewerError.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Failed to join stream' },
          { status: 500 }
        )
      }

      // Atualizar contador (usar increment se disponível)
      const newCount = stream.viewer_count + 1
      await supabase
        .from('streams')
        .update({ viewer_count: newCount })
        .eq('id', streamId)

      return NextResponse.json(
        {
          message: 'Viewer joined',
          viewerCount: newCount,
        },
        { status: 200 }
      )
    } else if (action === 'leave') {
      // Remover viewer
      await supabase
        .from('stream_viewers')
        .delete()
        .eq('stream_id', streamId)
        .eq('session_id', sessionId)

      // Atualizar contador
      const newCount = Math.max(0, stream.viewer_count - 1)
      await supabase
        .from('streams')
        .update({ viewer_count: newCount })
        .eq('id', streamId)

      return NextResponse.json(
        {
          message: 'Viewer left',
          viewerCount: newCount,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Viewer update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const streamId = searchParams.get('streamId')

    if (!streamId) {
      return NextResponse.json(
        { error: 'Stream ID is required' },
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

    // Obter informações do stream
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('id, viewer_count, started_at')
      .eq('id', streamId)
      .single()

    if (streamError || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    // Obter viewers únicos
    const { count: uniqueViewers, error: viewersError } = await supabase
      .from('stream_viewers')
      .select('id', { count: 'exact', head: true })
      .eq('stream_id', streamId)

    return NextResponse.json(
      {
        streamId,
        currentViewers: stream.viewer_count,
        uniqueViewers: uniqueViewers || 0,
        streamStartedAt: stream.started_at,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get viewers error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
