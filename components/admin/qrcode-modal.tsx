'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, Copy, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Profile } from '@/lib/supabase'

interface QRCodeModalProps {
  profile: Profile
  onClose: () => void
  onProfileUpdate: (profile: Profile) => void
}

export function QRCodeModal({ profile, onClose, onProfileUpdate }: QRCodeModalProps) {
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(profile.qr_code_url || null)
  const [message, setMessage] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)

  const generateQRCode = async (sendEmail: boolean = false) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`/api/profiles/${profile.id}/qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sendEmail }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate QR code')
      }

      const data = await response.json()
      setQrCode(data.qrCode)
      setMessage(
        sendEmail
          ? `QR code generated and sent to ${profile.email}!`
          : 'QR code generated successfully!'
      )

      // Update profile
      const updatedProfile = {
        ...profile,
        qr_code_url: data.qrCode,
        qr_email_sent: sendEmail ? true : profile.qr_email_sent,
        qr_sent_at: sendEmail ? new Date().toISOString() : profile.qr_sent_at,
      }
      onProfileUpdate(updatedProfile)

      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to generate QR code')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement('a')
    link.href = qrCode
    link.download = `${profile.slug}-qr.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyProfileLink = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'
    const profileUrl = `${baseUrl}/profile/${profile.slug}`

    await navigator.clipboard.writeText(profileUrl)
    setMessage('Profile link copied to clipboard!')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg"
        >
          <CheckCircle className="w-5 h-5" />
          <span>{message}</span>
        </motion.div>
      )}

      {/* QR Code Display */}
      {qrCode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="p-6 bg-white rounded-lg border-2 border-border">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-80 h-80"
            />
          </div>
          <p className="text-sm text-foreground/60 mt-4 text-center">
            Scan this code to view {profile.name}'s profile
          </p>
        </motion.div>
      )}

      {/* Profile Link */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Profile Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${profile.slug}`}
            readOnly
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-muted text-foreground/70 text-sm"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyProfileLink}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {!qrCode && (
          <Button
            onClick={() => generateQRCode(false)}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </Button>
        )}

        {qrCode && (
          <>
            <Button
              onClick={downloadQRCode}
              variant="outline"
              className="w-full gap-2"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </Button>

            <Button
              onClick={() => {
                setSendingEmail(true)
                generateQRCode(true).finally(() => setSendingEmail(false))
              }}
              disabled={loading || sendingEmail || profile.qr_email_sent}
              className="w-full gap-2"
            >
              <Mail className="w-4 h-4" />
              {profile.qr_email_sent
                ? 'Email Already Sent'
                : sendingEmail
                  ? 'Sending...'
                  : `Send QR Code to ${profile.email}`}
            </Button>

            <Button
              onClick={() => generateQRCode(false)}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              Regenerate QR Code
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
