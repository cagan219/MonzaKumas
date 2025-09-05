'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';

interface LayoutWrapperProps {
  children: ReactNode;
  showNavbar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

const pageVariants = {
  initial: { 
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  out: { 
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 30 },
  in: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1
    }
  }
};

export default function LayoutWrapper({
  children,
  showNavbar = false,
  showHeader = true,
  showFooter = true,
  className = ''
}: LayoutWrapperProps) {
  const pathname = usePathname();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Navigation Components */}
      {showNavbar && <Navbar />}
      {showHeader && <Header />}
      
      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="flex-grow"
        >
          <motion.div variants={contentVariants}>
            {children}
          </motion.div>
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      {showFooter && <Footer />}
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0, 
            y: 20,
            transition: { duration: 0.2 }
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Scroll to top"
        >
          <motion.svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -10 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Specialized layout variants
export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper showNavbar showHeader={false}>
      {children}
    </LayoutWrapper>
  );
}

export function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper showHeader showFooter className="bg-gray-50">
      {children}
    </LayoutWrapper>
  );
}

export function MinimalLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper showHeader={false} showFooter={false}>
      {children}
    </LayoutWrapper>
  );
}