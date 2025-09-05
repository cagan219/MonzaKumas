'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale = 'tr' }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -250]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    tr: {
      title: 'Monza Tekstil',
      subtitle: 'Premium kumaşlar ile zarafeti keşfedin',
      description: 'Takım elbise ve resmi giyim için en kaliteli kumaşları keşfedin. Her detayda mükemmelliği yaşayın.',
      cta: 'Kataloğu İnceleyin',
      cta2: 'İletişime Geçin'
    },
    en: {
      title: 'Monza Tekstil',
      subtitle: 'Discover elegance with premium fabrics',
      description: 'Explore the finest quality fabrics for suits and formal wear. Experience perfection in every detail.',
      cta: 'View Catalog',
      cta2: 'Contact Us'
    }
  };

  const text = content[locale as keyof typeof content] || content.tr;

  if (!mounted) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-5xl font-heading font-bold mb-4">{text.title}</h1>
          <p className="text-xl">{text.subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        {/* Gradient Background (placeholder for actual image) */}
        <div className="w-full h-[120%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
          >
            {text.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-elegant mb-4 opacity-90"
          >
            {text.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed"
          >
            {text.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={`/${locale}/catalog`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {text.cta}
              </motion.button>
            </Link>
            
            <Link href={`/${locale}/contact`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                {text.cta2}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}