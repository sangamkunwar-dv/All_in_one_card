import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) {
    return false
  }

  // If no hash is set, verify against plain password from env
  if (!ADMIN_PASSWORD_HASH) {
    const plainPassword = process.env.ADMIN_PASSWORD || ''
    return password === plainPassword
  }

  return verifyPassword(password, ADMIN_PASSWORD_HASH)
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value === 'true'
}
