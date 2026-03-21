'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  Youtube,
  Facebook,
  Instagram,
} from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/sangam_____daji/', label: 'Instagram', color: 'from-pink-500 to-rose-500' },
  { icon: Facebook, href: 'https://www.facebook.com/sangam.kunwar.682043/', label: 'Facebook', color: 'from-blue-600 to-blue-500' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'from-red-600 to-red-500' },
  { icon: Github, href: 'https://github.com/sangamkunwar-dv', label: 'GitHub', color: 'from-gray-700 to-gray-600' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sangam-kunwar-14b89834a/', label: 'LinkedIn', color: 'from-blue-700 to-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'from-sky-500 to-sky-400' },
  { icon: MessageCircle, href: 'https://wa.me/9701024066', label: 'WhatsApp', color: 'from-green-600 to-green-500' },
  { icon: Mail, href: 'mailto:contact@sangamkunwar.com.np', label: 'Email', color: 'from-purple-600 to-violet-600' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export function SocialLinks() {
  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Connect With Me
      </h2>

      <motion.div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 place-items-center">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 group-hover:border-white/40 transition-all duration-300" />

              {/* Icon */}
              <div className="relative flex items-center justify-center w-14 h-14 rounded-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <Icon className="w-6 h-6 text-foreground/60 group-hover:text-white relative z-10 transition-colors duration-300" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {social.label}
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
