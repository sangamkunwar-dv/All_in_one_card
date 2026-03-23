import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// ================= CONFIG =================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sangamkunwar48@gmail.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sangam@kunwar124680'

// ✅ KEEP THIS SAME EVERYWHERE
export const COOKIE_NAME = 'admin'

// ================= PASSWORD =================
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (err) {
    console.error('Bcrypt error:', err)
    return false
  }
}

// ================= LOGIN =================
export async function loginAdmin(email: string, password: string): Promise<boolean> {
  console.log('Login attempt:', email)

  if (!email || !password) {
    console.log('Missing email or password')
    return false
  }

  if (email !== ADMIN_EMAIL) {
    console.log('Wrong email')
    return false
  }

  // ✅ Use hash if exists
  if (ADMIN_PASSWORD_HASH && ADMIN_PASSWORD_HASH.trim() !== '') {
    const result = await verifyPassword(password, ADMIN_PASSWORD_HASH)
    console.log('Hash check:', result)
    return result
  }

  // ✅ fallback plain password
  const result = password === ADMIN_PASSWORD
  console.log('Plain check:', result)
  return result
}

// ================= SESSION =================

// ❌ DO NOT USE THIS in API anymore (use response.cookies.set instead)
export function setAdminSession() {
  try {
    cookies().set(COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (err) {
    console.error('Set cookie error:', err)
  }
}

// ✅ CLEAR COOKIE (used in logout API)
export function clearAdminSession() {
  try {
    cookies().set(COOKIE_NAME, '', {
      path: '/',
      expires: new Date(0),
    })
  } catch (err) {
    console.error('Clear cookie error:', err)
  }
}

// ✅ GET SESSION (SERVER ONLY)
export function getAdminSession(): boolean {
  try {
    const session = cookies().get(COOKIE_NAME)
    return session?.value === 'true'
  } catch (err) {
    console.error('Get session error:', err)
    return false
  }
}