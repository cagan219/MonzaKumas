import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../components/LanguageContext'
import ProductCard from '../components/ProductCard'
import FiltersBar from '../components/FiltersBar'

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

export default function CatalogPage() {
  const { t } = useLanguage()
  const [fabrics, setFabrics] = useState([])
  const [filteredFabrics, setFilteredFabrics] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fabric data - replace with actual API call
    const loadFabrics = async () => {
      try {
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
          },
          {
            id: 'fab-005',
            slug: 'pinstripe-classic',
            name: { tr: 'Klasik Çizgili', en: 'Classic Pinstripe' },
            pattern: 'Pinstripe',
            colors: ['Charcoal Gray', 'Gray'],
            swatchType: 'Super 110s',
            pricePerMeter: 72,
            lengthMeters: 38,
            inStock: true,
            images: ['/api/placeholder/300/300']
          },
          {
            id: 'fab-006',
            slug: 'check-pattern',
            name: { tr: 'Kareli Desen', en: 'Check Pattern' },
            pattern: 'Check',
            colors: ['Light Gray', 'Gray'],
            swatchType: 'Super 120s',
            pricePerMeter: 78,
            lengthMeters: 0,
            inStock: false,
            images: ['/api/placeholder/300/300']
          }
        ]
        
        setFabrics(mockFabrics)
        setFilteredFabrics(mockFabrics)
        setLoading(false)
      } catch (error) {
        console.error('Error loading fabrics:', error)
        setLoading(false)
      }
    }

    loadFabrics()
  }, [])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    // Apply filters - simple client-side filtering for demo
    let filtered = fabrics
    
    if (newFilters.pattern) {
      filtered = filtered.filter(fabric => fabric.pattern === newFilters.pattern)
    }
    
    if (newFilters.inStock !== undefined) {
      filtered = filtered.filter(fabric => fabric.inStock === newFilters.inStock)
    }
    
    if (newFilters.colors && newFilters.colors.length > 0) {
      filtered = filtered.filter(fabric => 
        newFilters.colors.some(color => fabric.colors.includes(color))
      )
    }

    setFilteredFabrics(filtered)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Fabric Catalog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Browse our complete collection of premium fabrics and textiles
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <FiltersBar filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Products
              </h2>
              <p className="text-gray-600">
                {filteredFabrics.length > 0 ? `Showing ${filteredFabrics.length} of ${fabrics.length} products` : 'No products found'}
              </p>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(filters)}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredFabrics.map((fabric, index) => (
                  <motion.div key={fabric.id} variants={itemVariants}>
                    <ProductCard fabric={fabric} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredFabrics.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setFilters({})
                    setFilteredFabrics(fabrics)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}