import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { phone, token } = await req.json()

    if (!phone || !token) {
      return NextResponse.json(
        { error: 'Phone and token are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // Se o usuário é novo, criar perfil e wallet
    if (data.user && data.session) {
      // Verificar se perfil já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!existingProfile) {
        // Criar perfil
        await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              phone_number: phone,
              display_name: phone, // Usar telefone como nome inicial
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
              bio: 'Novo creator na Kwanza Stream',
              is_creator: false,
              verification_status: 'unverified',
            },
          ])

        // Inicializar wallet
        await supabase
          .from('wallets')
          .insert([
            {
              user_id: data.user.id,
              balance: 0,
              total_earned: 0,
              total_spent: 0,
              currency: 'KZ',
            },
          ])
      }
    }

    return NextResponse.json({ session: data.session })
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
