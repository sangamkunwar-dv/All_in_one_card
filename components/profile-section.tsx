'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function ProfileSection() {
  return (
    <motion.section className="text-center">
      {/* Profile Picture */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        viewport={{ once: false }}
      >
        <motion.div
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}
        >
          <Image
            src="/sangamkunwarphoto.png"
            alt="Sangam Kunwar"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Name with Badge */}
      <motion.div
        className="mb-2"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: false }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sangam Kunwar
          </h1>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle2 className="w-7 h-7 text-accent fill-accent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Company */}
      <motion.p
        className="text-lg text-muted-foreground font-medium mb-4"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false }}
      >
        Full Stack Developer
      </motion.p>

      {/* Bio */}
      <motion.p
        className="text-base sm:text-lg text-foreground/80 max-w-md mx-auto leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: false }}
      >
        Passionate about building innovative digital experiences and solving complex problems.
        Let's create something amazing together.
      </motion.p>
    </motion.section>
  );
}
