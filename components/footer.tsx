'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from './language-context';

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const socialIconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 17 
    }
  }
};

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { name: t('header.about'), href: '/about' },
      { name: t('header.catalog'), href: '/catalog' },
      { name: t('header.contact'), href: '/contact' },
      { name: t('header.order'), href: '/order' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Returns', href: '/returns' },
    ],
    social: [
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
    ]
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-gray-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <motion.h3 
                className="text-2xl font-heading font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Monza Tekstil
              </motion.h3>
            </Link>
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-6 max-w-md leading-relaxed"
            >
              Premium fabrics for suits and formal wear. Crafting excellence in every thread since our founding.
            </motion.p>
            
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">Akşemsettin, Eyüpsultan/Istanbul</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">+90 532 747 3215</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">monzakumas@gmail.com</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-220"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-220"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          {/* Copyright */}
          <motion.p 
            className="text-gray-400 text-sm mb-4 md:mb-0"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Monza Tekstil. All rights reserved.
          </motion.p>

          {/* Social Icons */}
          <motion.div 
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            {footerLinks.social.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-220"
                  variants={socialIconVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="h-5 w-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}