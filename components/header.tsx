'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from './language-context';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { 
      name: t('header.catalog'), 
      href: '/catalog' 
    },
    { 
      name: t('header.about'), 
      href: '/about' 
    },
    { 
      name: t('header.contact'), 
      href: '/contact' 
    },
  ];

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Brand - Centered */}
          <Link 
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-heading font-bold text-gray-900 tracking-tight"
          >
            Monza Tekstil
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 text-sm transition-colors ${
                language === 'tr' 
                  ? 'font-bold text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              TR
            </button>
            <span className="text-gray-400">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm transition-colors ${
                language === 'en' 
                  ? 'font-bold text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeDrawer}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 28,
              }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-heading font-semibold text-gray-900">
                  {t('common.menu')}
                </h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeDrawer}
                        className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  © 2024 Monza Tekstil
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}