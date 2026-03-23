import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { loginAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const isValid = await loginAdmin(email, password)

    console.log('LOGIN CHECK:', isValid) // ✅ DEBUG

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // ✅ SET COOKIE HERE (IMPORTANT FIX)
    cookies().set('admin', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}