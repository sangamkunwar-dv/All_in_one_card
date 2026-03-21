'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { QrCode, BarChart3, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          QR Profile
        </motion.h1>
        <Link href="/admin/login">
          <Button variant="outline">Admin Login</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Digital Business Cards Made Easy
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Create, manage, and share professional QR-powered digital profiles. Let your users scan a QR code to instantly access your complete information.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-card border border-border rounded-lg p-8">
            <QrCode className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">QR Code Generation</h3>
            <p className="text-foreground/70">
              Automatically generate unique QR codes for each profile and send them via email instantly.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Multi-User Management</h3>
            <p className="text-foreground/70">
              Create and manage unlimited digital profiles for your entire team or organization.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <BarChart3 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Rich Profiles</h3>
            <p className="text-foreground/70">
              Include social links, services, pricing, contact info, and more on each profile.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Instant Sharing</h3>
            <p className="text-foreground/70">
              Share profiles directly, download vCards, or let people scan your QR code.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Log in to the admin panel to create your first digital profile and generate QR codes.
          </p>
          <Link href="/admin/login">
            <Button size="lg" className="gap-2">
              <QrCode className="w-5 h-5" />
              Go to Admin Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center text-foreground mb-12"
        >
          How It Works
        </motion.h3>

        <div className="space-y-8">
          {[
            { step: '1', title: 'Create Profile', desc: 'Admin creates a new user profile with name, title, contact info, and social links' },
            { step: '2', title: 'Generate QR Code', desc: 'System automatically generates a unique QR code linked to the profile' },
            { step: '3', title: 'Send Email', desc: 'Email the QR code to the user with a direct link to their profile' },
            { step: '4', title: 'Share Instantly', desc: 'Users share their profile via QR code, link, or download vCard' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                  {item.step}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground">{item.title}</h4>
                <p className="text-foreground/70 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-foreground/60">
            © 2024 QR Profile Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
