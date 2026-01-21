import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface SendMessageRequest {
  streamId: string
  message: string
  messageType: 'text' | 'system' | 'salo_notification'
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const body: SendMessageRequest = await request.json()

    const { streamId, message, messageType = 'text' } = body

    if (!streamId || !message) {
      return NextResponse.json(
        { error: 'Stream ID and message are required' },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long (max 500 characters)' },
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

    // Obter perfil do user
    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name, avatar_url, is_creator')
      .eq('id', userData.user.id)
      .single()

    // Verificar se stream existe
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('id, status')
      .eq('id', streamId)
      .single()

    if (streamError || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    if (stream.status !== 'live') {
      return NextResponse.json(
        { error: 'Stream is not live' },
        { status: 400 }
      )
    }

    // Filtrar palavras ofensivas (básico)
    const bannedWords = ['spam', 'hate', 'abuse']
    const containsBanned = bannedWords.some(word =>
      message.toLowerCase().includes(word)
    )

    if (containsBanned) {
      return NextResponse.json(
        { error: 'Message contains banned words' },
        { status: 400 }
      )
    }

    // Registar mensagem
    const { data: chatMessage, error: messageError } = await supabase
      .from('stream_chat_messages')
      .insert([
        {
          stream_id: streamId,
          user_id: userData.user.id,
          message,
          message_type: messageType,
          sender_name: profile?.display_name || 'Anonymous',
          sender_avatar: profile?.avatar_url,
          is_creator: profile?.is_creator || false,
        },
      ])
      .select()
      .single()

    if (messageError) {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Publicar evento via Supabase Realtime
    await supabase
      .from('stream_chat_messages')
      .on('INSERT', (payload) => {
        // Realtime event será enviado automaticamente
      })

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        chatMessage,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Send message error:', error)
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
    const limit = parseInt(searchParams.get('limit') || '50')

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

    // Obter mensagens recentes
    const { data: messages, error: messagesError } = await supabase
      .from('stream_chat_messages')
      .select('*')
      .eq('stream_id', streamId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (messagesError) {
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        messages: messages.reverse(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fetch messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
