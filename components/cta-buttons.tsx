'use client';

import { motion } from 'framer-motion';
import { Download, Briefcase, Send } from 'lucide-react';

const buttons = [
  {
    icon: Download,
    label: 'Download CV',
    description: 'Get my resume',
    href: '#',
    primary: true,
  },
  {
    icon: Briefcase,
    label: 'View Portfolio',
    description: 'See my work',
    href: 'https://sangamkunwar.com.np',
    primary: false,
  },
  {
    icon: Send,
    label: 'Hire Me',
    description: 'Get in touch',
    href: 'https://www.sangamkunwar.com.np/#contact',
    primary: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CTAButtons() {
  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {buttons.map((btn, index) => {
          const Icon = btn.icon;
          return (
            <motion.a
              key={index}
              href={btn.href}
              className={`group relative p-5 rounded-2xl border transition-all duration-300 ${btn.primary
                ? 'bg-gradient-to-br from-primary to-accent border-accent/50 hover:border-accent text-white shadow-lg hover:shadow-2xl'
                : 'bg-card border-border hover:border-primary/50 hover:bg-secondary/30 text-foreground'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: false }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 p-2.5 rounded-lg ${btn.primary
                    ? 'bg-white/20'
                    : 'bg-primary/10'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${btn.primary ? 'text-white' : 'text-primary'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{btn.label}</h3>
                  <p className={`text-xs ${btn.primary ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {btn.description}
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              {btn.primary && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-full top-0 left-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              )}
            </motion.a>
          );
        })}
      </div>
    </motion.section>
  );
}
