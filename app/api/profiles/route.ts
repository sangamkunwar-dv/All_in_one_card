import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, title, bio, email, phone, location, slug, ...rest } = body

    if (!name || !title || !email || !slug) {
      return NextResponse.json(
        { error: 'Name, title, email, and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          name,
          title,
          bio,
          email,
          phone,
          location,
          slug,
          services: [],
          qr_email_sent: false,
          ...rest,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    )
  }
}
