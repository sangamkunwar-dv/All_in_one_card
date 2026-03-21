'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function Header() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <motion.div
          className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Sangam Kunwar
        </motion.div>

        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
