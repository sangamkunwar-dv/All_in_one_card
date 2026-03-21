'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Mail, Edit2, Trash2, Copy } from 'lucide-react';
import { EditProfileForm } from './edit-profile-form';
import { QRCodeModal } from './qrcode-modal';

interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  photo_url: string;
  slug: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  website_url: string;
  services: any[];
  qr_email_sent: boolean;
  qr_sent_at: string;
  created_at: string;
}

interface ProfileCardProps {
  profile: Profile;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export function ProfileCard({ profile, onDelete, onRefresh }: ProfileCardProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(profile.id);
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile');
    } finally {
      setIsDeleting(false);
    }
  };

  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${profile.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    alert('Profile URL copied to clipboard!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{profile.name}</span>
            <span className="text-sm font-normal text-muted-foreground">{profile.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{profile.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{profile.location || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Slug</p>
              <p className="font-medium">{profile.slug}</p>
            </div>
          </div>

          {/* QR Status */}
          <div className="bg-muted p-3 rounded text-sm">
            {profile.qr_email_sent ? (
              <p className="text-green-600 flex items-center gap-2">
                ✓ QR code sent on {new Date(profile.qr_sent_at).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-amber-600">QR code not yet sent</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsQROpen(true)}
              className="gap-2"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2 ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditProfileForm
        profile={profile}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={onRefresh}
      />

      <QRCodeModal
        profile={profile}
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        onSuccess={onRefresh}
      />
    </>
  );
}
