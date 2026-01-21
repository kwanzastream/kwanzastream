import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const { email, password, displayName, phoneNumber } = await request.json()

    // Validação
    if (!email || !password || !displayName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
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

    // Registar com Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          phone_number: phoneNumber,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // Criar perfil de user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user?.id,
          email,
          display_name: displayName,
          phone_number: phoneNumber,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`,
          bio: 'Novo creator na Kwanza Stream',
          is_creator: false,
          verification_status: 'unverified',
        },
      ])

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      )
    }

    // Inicializar wallet
    const { error: walletError } = await supabase
      .from('wallets')
      .insert([
        {
          user_id: authData.user?.id,
          balance: 0,
          total_earned: 0,
          total_spent: 0,
          currency: 'KZ',
        },
      ])

    if (walletError) {
      return NextResponse.json(
        { error: walletError.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: 'Registration successful. Please check your email for verification.',
        user: authData.user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
