'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, QrCode, Mail, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Profile } from '@/lib/supabase'
import QRCodeModal from './qrcode-modal'

interface ProfileListProps {
  profiles: Profile[]
  onDelete: (id: string) => void
  onProfilesUpdate: (profiles: Profile[]) => void
}

export default function ProfileList({ profiles, onDelete, onProfilesUpdate }: ProfileListProps) {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      {profiles.map((profile, idx) => (
        <motion.div
          key={profile.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="p-6 hover:border-primary/50 transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Profile Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
                <p className="text-primary font-semibold">{profile.title}</p>
                <p className="text-foreground/60 text-sm mt-2">{profile.bio}</p>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-2 text-foreground/70">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </span>
                  {profile.phone && (
                    <span className="text-foreground/70">{profile.phone}</span>
                  )}
                  {profile.location && (
                    <span className="text-foreground/70">{profile.location}</span>
                  )}
                </div>

                {/* Slug */}
                <div className="mt-3">
                  <a
                    href={`/profile/${profile.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Profile
                  </a>
                </div>

                {/* QR Status */}
                {profile.qr_email_sent && (
                  <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
                    QR Code Sent
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Dialog open={qrDialogOpen && selectedProfileId === profile.id} onOpenChange={setQrDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => setSelectedProfileId(profile.id)}
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>QR Code for {profile.name}</DialogTitle>
                    </DialogHeader>
                    <QRCodeModal
                      profile={profile}
                      onClose={() => setQrDialogOpen(false)}
                      onProfileUpdate={(updated) => {
                        onProfilesUpdate(
                          profiles.map((p) => (p.id === updated.id ? updated : p))
                        )
                      }}
                    />
                  </DialogContent>
                </Dialog>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(profile.id)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
