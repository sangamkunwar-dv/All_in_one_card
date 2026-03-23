import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// ================= CONFIG =================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

// ✅ KEEP THIS SAME EVERYWHERE
export const COOKIE_NAME = 'admin'

// ================= PASSWORD =================
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ================= LOGIN =================
export async function loginAdmin(email: string, password: string): Promise<boolean> {
  console.log('Login attempt:', email)

  if (email !== ADMIN_EMAIL) {
    console.log('Wrong email')
    return false
  }

  // ✅ If hashed password exists
  if (ADMIN_PASSWORD_HASH) {
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

// ✅ SET COOKIE
export function setAdminSession() {
  cookies().set(COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

// ✅ CLEAR COOKIE
export function clearAdminSession() {
  cookies().set(COOKIE_NAME, '', {
    path: '/',
    expires: new Date(0),
  })
}

// ✅ GET SESSION (SERVER SIDE ONLY)
export function getAdminSession(): boolean {
  const session = cookies().get(COOKIE_NAME)
  return session?.value === 'true'
}