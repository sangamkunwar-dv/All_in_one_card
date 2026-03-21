'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'
import type { Profile } from '@/lib/supabase'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  bio: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagram_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  twitter_url: z.string().optional(),
  github_url: z.string().optional(),
  facebook_url: z.string().optional(),
  youtube_url: z.string().optional(),
  tiktok_url: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface CreateProfileFormProps {
  onProfileCreated: (profile: Profile) => void
}

export function CreateProfileForm({ onProfileCreated }: CreateProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website_url: data.website_url || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create profile')
        return
      }

      const newProfile = await response.json()
      setSuccess('Profile created successfully!')
      reset()
      setTimeout(() => {
        onProfileCreated(newProfile)
      }, 500)
    } catch (err) {
      setError('An error occurred while creating the profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Basic Information</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Title/Position *
          </label>
          <Input
            type="text"
            placeholder="Software Engineer"
            {...register('title')}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Bio
          </label>
          <Textarea
            placeholder="Tell us about yourself..."
            {...register('bio')}
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Slug (URL-friendly identifier) *
          </label>
          <Input
            type="text"
            placeholder="john-doe"
            {...register('slug')}
            className={errors.slug ? 'border-red-500' : ''}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="font-semibold text-foreground">Contact Information</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Location
          </label>
          <Input
            type="text"
            placeholder="San Francisco, CA"
            {...register('location')}
          />
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="font-semibold text-foreground">Links</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Website URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com"
            {...register('website_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            GitHub URL
          </label>
          <Input
            type="url"
            placeholder="https://github.com/username"
            {...register('github_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            LinkedIn URL
          </label>
          <Input
            type="url"
            placeholder="https://linkedin.com/in/username"
            {...register('linkedin_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Twitter URL
          </label>
          <Input
            type="url"
            placeholder="https://twitter.com/username"
            {...register('twitter_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Instagram URL
          </label>
          <Input
            type="url"
            placeholder="https://instagram.com/username"
            {...register('instagram_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Facebook URL
          </label>
          <Input
            type="url"
            placeholder="https://facebook.com/username"
            {...register('facebook_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            YouTube URL
          </label>
          <Input
            type="url"
            placeholder="https://youtube.com/@username"
            {...register('youtube_url')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            TikTok URL
          </label>
          <Input
            type="url"
            placeholder="https://tiktok.com/@username"
            {...register('tiktok_url')}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t pt-6">
        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? 'Creating Profile...' : 'Create Profile'}
        </Button>
      </div>
    </form>
  )
}
