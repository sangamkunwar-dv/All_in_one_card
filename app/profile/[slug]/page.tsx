'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, 
  Globe, Download, Share2, Facebook, Youtube
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Profile, Service } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ProfilePageProps {
  params: Promise<{ slug: string }>
}

const socialIconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
}

const socialUrlMap: Record<string, string> = {
  github_url: 'github',
  linkedin_url: 'linkedin',
  twitter_url: 'twitter',
  instagram_url: 'instagram',
  facebook_url: 'facebook',
  youtube_url: 'youtube',
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error || !data) {
          setProfile(null)
        } else {
          setProfile(data)
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [slug])

  const downloadVCard = () => {
    if (!profile) return

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
EMAIL:${profile.email}
${profile.phone ? `TEL:${profile.phone}` : ''}
${profile.location ? `ADR:;;${profile.location}` : ''}
${profile.website_url ? `URL:${profile.website_url}` : ''}
${profile.github_url ? `X-GITHUB:${profile.github_url}` : ''}
${profile.linkedin_url ? `X-LINKEDIN:${profile.linkedin_url}` : ''}
END:VCARD`

    const element = document.createElement('a')
    element.setAttribute('href', `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`)
    element.setAttribute('download', `${profile.slug}.vcf`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shareProfile = async () => {
    if (!profile) return

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `Check out ${profile.name}'s profile`,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl)
      alert('Profile URL copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-foreground/60 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Not Found</h1>
          <p className="text-foreground/60">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {profile.photo_url && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src={profile.photo_url}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <h1 className="text-4xl font-bold text-foreground mb-2">{profile.name}</h1>
          <p className="text-xl text-primary font-semibold mb-4">{profile.title}</p>

          {profile.bio && (
            <p className="text-foreground/70 text-lg mb-6 max-w-xl mx-auto">{profile.bio}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center flex-wrap mb-8">
            <Button
              onClick={downloadVCard}
              variant="default"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download Contact
            </Button>
            <Button
              onClick={shareProfile}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 mb-12"
        >
          {profile.email && (
            <Card className="p-4 flex items-center gap-4 hover:bg-card/80 transition">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Email</p>
                <a href={`mailto:${profile.email}`} className="text-foreground hover:text-primary transition">
                  {profile.email}
                </a>
              </div>
            </Card>
          )}

          {profile.phone && (
            <Card className="p-4 flex items-center gap-4 hover:bg-card/80 transition">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Phone</p>
                <a href={`tel:${profile.phone}`} className="text-foreground hover:text-primary transition">
                  {profile.phone}
                </a>
              </div>
            </Card>
          )}

          {profile.location && (
            <Card className="p-4 flex items-center gap-4 hover:bg-card/80 transition">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/60">Location</p>
                <p className="text-foreground">{profile.location}</p>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Social Links */}
        {Object.entries(socialUrlMap).some(([key]) => profile[key as keyof Profile]) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(socialUrlMap).map(([urlKey, iconKey]) => {
                const url = profile[urlKey as keyof Profile]
                if (!url) return null

                const Icon = socialIconMap[iconKey]
                return (
                  <a
                    key={urlKey}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:bg-accent/20 transition"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="capitalize">{iconKey.replace('_url', '')}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Website Link */}
        {profile.website_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              <Globe className="w-5 h-5" />
              Visit Website
            </a>
          </motion.div>
        )}

        {/* Services */}
        {profile.services && profile.services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Services</h2>
            <div className="grid gap-4">
              {(profile.services as Service[]).map((service) => (
                <Card key={service.id} className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.name}</h3>
                  <p className="text-foreground/70 mb-3">{service.description}</p>
                  {service.price && (
                    <p className="text-primary font-semibold">${service.price}</p>
                  )}
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
