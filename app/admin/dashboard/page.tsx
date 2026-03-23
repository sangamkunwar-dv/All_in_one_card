'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreateProfileForm } from '@/components/admin/create-profile-form'
import { ProfileCard } from '@/components/admin/profile-card'

interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  photo_url: string
  slug: string
  instagram_url: string
  linkedin_url: string
  twitter_url: string
  github_url: string
  website_url: string
  services: any[]
  qr_email_sent: boolean
  qr_sent_at: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin='))

    if (!cookie) {
      router.push('/admin/login')
      return
    }

    fetchProfiles()
  }

  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/profiles')

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      setProfiles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching profiles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })

      // remove cookie manually
      document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"

      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const handleDelete = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id))
  }

  const handleProfileCreated = (newProfile: Profile) => {
    setProfiles([newProfile, ...profiles])
    setDialogOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-foreground/60 mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-6xl mx-auto p-6">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/60 mt-2">
              Manage user profiles and generate QR codes
            </p>
          </div>

          <Button onClick={handleLogout} variant="outline" size="lg" className="gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>

        <div className="mb-8">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create New Profile
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Profile</DialogTitle>
              </DialogHeader>
              <CreateProfileForm onProfileCreated={handleProfileCreated} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {profiles.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-foreground/60 text-lg">
                No profiles yet. Create one to get started.
              </p>
            </div>
          ) : (
            profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onDelete={handleDelete}
                onRefresh={fetchProfiles}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}