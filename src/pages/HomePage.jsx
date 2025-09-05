import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../components/LanguageContext'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/ui/button'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function HomePage() {
  const { t } = useLanguage()
  const [featuredFabrics, setFeaturedFabrics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading featured fabrics
    const loadFeaturedFabrics = async () => {
      try {
        // Mock data for now - you can replace with actual API call
        const mockFabrics = [
          {
            id: 'fab-001',
            slug: 'premium-wool-navy',
            name: { tr: 'Premium Yün Karışımı', en: 'Premium Wool Blend' },
            pattern: 'Solid',
            colors: ['Navy Blue', 'Dark Blue'],
            swatchType: 'Super 120s',
            pricePerMeter: 85,
            lengthMeters: 50,
            inStock: true,
            images: ['/api/placeholder/300/300']
          },
          {
            id: 'fab-002',
            slug: 'herringbone-luxury',
            name: { tr: 'Lüks Balık Sırtı', en: 'Luxury Herringbone' },
            pattern: 'Herringbone',
            colors: ['Charcoal Gray', 'Dark Gray'],
            swatchType: 'Super 130s',
            pricePerMeter: 95,
            lengthMeters: 35,
            inStock: true,
            images: ['/api/placeholder/300/300']
          },
          {
            id: 'fab-003',
            slug: 'silk-blend-black',
            name: { tr: 'İpek Karışımı', en: 'Silk Blend' },
            pattern: 'Solid',
            colors: ['Midnight Black', 'Black'],
            swatchType: 'Silk Mix',
            pricePerMeter: 120,
            lengthMeters: 25,
            inStock: true,
            images: ['/api/placeholder/300/300']
          },
          {
            id: 'fab-004',
            slug: 'tweed-classic',
            name: { tr: 'Klasik Tüvit', en: 'Classic Tweed' },
            pattern: 'Tweed',
            colors: ['Forest Green', 'Green'],
            swatchType: 'Super 110s',
            pricePerMeter: 68,
            lengthMeters: 42,
            inStock: true,
            images: ['/api/placeholder/300/300']
          }
        ]
        
        setFeaturedFabrics(mockFabrics)
        setLoading(false)
      } catch (error) {
        console.error('Error loading fabrics:', error)
        setLoading(false)
      }
    }

    loadFeaturedFabrics()
  }, [])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover our premium collection of high-quality fabrics, perfect for your next project.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {featuredFabrics.map((fabric, index) => (
              <motion.div key={fabric.id} variants={itemVariants}>
                <ProductCard fabric={fabric} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/catalog">
            <Button size="lg" className="px-8">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}