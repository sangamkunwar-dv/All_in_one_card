import { NextRequest, NextResponse } from 'next/server'
import { clearAdminSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await clearAdminSession()

    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
