import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    console.log('Request body:', body) // ✅ DEBUG

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

    // ✅ CORRECT WAY TO SET COOKIE
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )

    response.cookies.set('admin', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    })

    return response

  } catch (error) {
    console.error('Login error FULL:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' }, // ✅ SHOW REAL ERROR
      { status: 500 }
    )
  }
}