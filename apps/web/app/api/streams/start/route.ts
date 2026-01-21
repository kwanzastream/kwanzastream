import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

interface StartStreamRequest {
  title: string
  description: string
  category: string
  isRadioMode: boolean
  tags: string[]
  thumbnailUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const body: StartStreamRequest = await request.json()

    const { title, description, category, isRadioMode, tags, thumbnailUrl } = body

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
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

    const streamId = uuidv4()
    const rtmpUrl = `rtmp://${process.env.NEXT_PUBLIC_STREAMING_SERVER || 'stream.kwanzastream.ao'}/live/${streamId}`
    const hlsUrl = `https://${process.env.NEXT_PUBLIC_STREAMING_SERVER || 'stream.kwanzastream.ao'}/hls/${streamId}.m3u8`

    // Criar stream no banco de dados
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .insert([
        {
          id: streamId,
          creator_id: userData.user.id,
          title,
          description,
          category,
          is_radio_mode: isRadioMode,
          tags: tags || [],
          thumbnail_url: thumbnailUrl,
          rtmp_url: rtmpUrl,
          hls_url: hlsUrl,
          status: 'live',
          viewer_count: 0,
          started_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (streamError) {
      return NextResponse.json(
        { error: 'Failed to create stream' },
        { status: 500 }
      )
    }

    // Registar evento de stream iniciado
    await supabase.from('stream_events').insert([
      {
        stream_id: streamId,
        event_type: 'started',
        metadata: {
          creator_id: userData.user.id,
          title,
          category,
        },
      },
    ])

    return NextResponse.json(
      {
        message: 'Stream started successfully',
        stream,
        rtmpUrl,
        hlsUrl,
        streamKey: streamId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Start stream error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
