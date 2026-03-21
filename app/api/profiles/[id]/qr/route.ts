import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'
import { sendQRCodeEmail } from '@/lib/email'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const isAdmin = await getAdminSession()

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { sendEmail } = await req.json()

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Generate QR code URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'
    const profileUrl = `${baseUrl}/profile/${profile.slug}`

    // Generate QR code as data URL
    const qrCodeUrl = await QRCode.toDataURL(profileUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 2,
      width: 300,
    })

    // Update profile with QR code
    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({
        qr_code_url: qrCodeUrl,
        qr_email_sent: sendEmail ? true : profile.qr_email_sent,
        qr_sent_at: sendEmail ? new Date().toISOString() : profile.qr_sent_at,
      })
      .eq('id', id)
      .select()

    if (updateError) {
      throw updateError
    }

    // Send email if requested
    if (sendEmail) {
      const emailSent = await sendQRCodeEmail(
        profile.email,
        profile.name,
        qrCodeUrl,
        profileUrl
      )

      if (!emailSent) {
        console.warn(`Failed to send email to ${profile.email}`)
      }
    }

    return NextResponse.json(
      {
        qrCode: qrCodeUrl,
        profileUrl,
        emailSent: sendEmail,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
