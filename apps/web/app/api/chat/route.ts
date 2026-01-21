import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const { streamId, message, messageType = 'text' } = await req.json()

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

    // Verificar autenticação
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

    // Verificar se stream existe e está live
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

    // Registrar mensagem (Supabase Realtime enviará automaticamente para subscribers)
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
      console.error('Chat message error:', messageError)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

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

// GET pode ser usado para buscar histórico, mas Realtime é preferido para tempo real
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const streamId = searchParams.get('streamId')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!streamId) {
      return NextResponse.json(
        { error: 'Stream ID is required' },
        { status: 400 }
      )
    }

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
