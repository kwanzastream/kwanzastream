import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp, email } = await request.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
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

    // Verificar OTP na tabela de OTP verification
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_verification')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('otp_code', otp)
      .eq('is_verified', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (otpError || !otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    // Marcar OTP como verificado
    await supabase
      .from('otp_verification')
      .update({ is_verified: true })
      .eq('id', otpRecord.id)

    // Atualizar profile para phone verified
    await supabase
      .from('profiles')
      .update({ phone_verified: true })
      .eq('email', email)

    return NextResponse.json(
      {
        message: 'OTP verified successfully',
        verified: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
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

    // Gerar novo OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    // Invalidar OTPs antigos
    await supabase
      .from('otp_verification')
      .update({ is_verified: true })
      .eq('phone_number', phoneNumber)
      .eq('is_verified', false)

    // Criar novo OTP
    const { data, error } = await supabase
      .from('otp_verification')
      .insert([
        {
          phone_number: phoneNumber,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          is_verified: false,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to generate OTP' },
        { status: 500 }
      )
    }

    // TODO: Enviar OTP via SMS (Unitel USSD ou Twilio)
    console.log(`[OTP] ${phoneNumber}: ${otp}`)

    return NextResponse.json(
      {
        message: 'OTP sent successfully',
        // Para desenvolvimento apenas
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('OTP generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
