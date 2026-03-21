'use client';

import { motion } from 'framer-motion';
import { Copy, Share2, QrCode } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sangam Kunwar - Digital Profile',
        text: 'Check out my digital profile card',
        url: window.location.href,
      });
    }
  };

  const generateQRCode = () => {
    // Using qr-server API for QR code generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`;
    window.open(qrUrl, '_blank');
  };

  return (
    <motion.footer
      className="relative z-10 mt-16 border-t border-border bg-background/50 backdrop-blur-sm"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.button
            onClick={handleCopyLink}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Copy className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
            </div>
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              <Share2 className="w-5 h-5 text-accent" />
              <span className="text-xs font-medium">Share</span>
            </div>
          </motion.button>

          <motion.button
            onClick={generateQRCode}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium">QR Code</span>
            </div>
          </motion.button>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: false }}
        >
          <p>© 2026 Sangam Kunwar. All rights reserved.</p>
          <p className="mt-2 text-xs">Made with <span className="text-red-500">❤️</span> and Next.js</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
