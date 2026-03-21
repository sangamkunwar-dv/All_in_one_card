-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  photo_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  -- Social links
  instagram_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  tiktok_url TEXT,
  website_url TEXT,
  
  -- Services
  services JSONB DEFAULT '[]'::jsonb,
  
  -- QR Code
  qr_code_url TEXT,
  qr_email_sent BOOLEAN DEFAULT FALSE,
  qr_sent_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_slug ON profiles(slug);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access for profiles via slug (for public viewing)
CREATE POLICY "Allow public read via slug" ON profiles
  FOR SELECT
  USING (true);

-- This table is public-read but admin-only for write operations
-- Admin access will be handled via API route authentication
