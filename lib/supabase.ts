import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  name: string
  title: string
  bio?: string
  email: string
  phone?: string
  location?: string
  photo_url?: string
  slug: string
  instagram_url?: string
  linkedin_url?: string
  twitter_url?: string
  github_url?: string
  facebook_url?: string
  youtube_url?: string
  tiktok_url?: string
  website_url?: string
  services: Service[]
  qr_code_url?: string
  qr_email_sent: boolean
  qr_sent_at?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  price?: number
}
