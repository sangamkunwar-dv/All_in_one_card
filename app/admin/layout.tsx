import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - QR Profile',
  description: 'Manage user profiles and QR codes',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
