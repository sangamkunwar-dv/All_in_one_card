'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Download } from 'lucide-react';

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+9779701024066',
    href: 'tel:+9779701024066',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@sangamkunwar.com.np',
    href: 'mailto:contact@sangamkunwar.com.np',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Tilottama-8,charnumber,Nepal',
    href: '#',
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

export function ContactSection() {
  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm p-8 sm:p-10">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href={item.href}
                className="group p-5 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: false }}
              >
                <motion.div
                  className="flex justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* vCard Download Button */}
        <motion.button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Generate vCard
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Sangam Kunwar
TEL:+9779701024066
EMAIL:contact@sangamkunwar.com.np
END:VCARD`;
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vcard));
            element.setAttribute('download', 'sangamkunwar-contact.vcf');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        >
          <Download className="w-4 h-4" />
          Save Contact
        </motion.button>
      </div>
    </motion.section>
  );
}
