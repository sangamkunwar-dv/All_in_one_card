import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sangam Kunwar - Digital Profile Card',
  description: 'Explore my professional profile, portfolio, and ways to connect. Scan the QR code to share my digital card.',
  generator: 'sangam kunwar',
  openGraph: {
    title: 'Sangam Kunwar - Digital Profile Card',
    description: 'Professional digital business card with social links and contact information',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/sangamkunwarphoto.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/sangamkunwarphoto.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/sangamkunwarphoto.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/sangamkunwarphoto.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geist.className} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
