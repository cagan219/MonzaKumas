import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Modern Header Component
function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <a href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                Monza Kumas
              </a>
            </div>
            
            {/* Search & Cart Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5 0a2 2 0 100 4 2 2 0 000-4zm-6 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'spring',
                stiffness: 320,
                damping: 28
              }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-4">
                  {[
                    { name: 'All Products', path: '/products' },
                    { name: 'Catalog', path: '/catalog' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact', path: '/contact' }
                  ].map((item, index) => (
                    <motion.a 
                      key={item.name}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Modern Footer Component
function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Monza Kumas</h3>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">© 2025 MINNA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Modern HomePage
function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading fabrics data
    const loadFabrics = async () => {
      try {
        // Mock data matching our Product type structure
        const mockProducts = [
          {
            id: "fab-001",
            slug: "premium-wool-navy", 
            name: "A Young Woman in Colorful Jacket",
            images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop"],
            pattern: "Solid",
            colors: ["Pink", "Green", "Yellow"],
            swatchType: "Super 120s",
            lengthMeters: 50,
            pricePerMeter: 108,
            createdAt: "2024-01-01T00:00:00.000Z"
          },
          {
            id: "fab-002",
            slug: "modern-casual-jacket",
            name: "Modern Casual Jacket", 
            images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop"],
            pattern: "Contemporary",
            colors: ["Orange", "Blue"],
            swatchType: "Super 130s",
            lengthMeters: 35,
            pricePerMeter: 95,
            createdAt: "2024-01-02T00:00:00.000Z"
          },
          {
            id: "fab-003", 
            slug: "premium-fabric-collection",
            name: "Premium Fabric Collection",
            images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop"],
            pattern: "Textured",
            colors: ["Pink", "White"],
            swatchType: "Silk Mix",
            lengthMeters: 25,
            pricePerMeter: 120,
            createdAt: "2024-01-03T00:00:00.000Z"
          },
          {
            id: "fab-004",
            slug: "elegant-textile-design",
            name: "Elegant Textile Design",
            images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop"],
            pattern: "Classic",
            colors: ["Beige", "Cream"],
            swatchType: "Super 110s", 
            lengthMeters: 42,
            pricePerMeter: 85,
            createdAt: "2024-01-04T00:00:00.000Z"
          },
          {
            id: "fab-005",
            slug: "contemporary-style",
            name: "Contemporary Style",
            images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"],
            pattern: "Modern",
            colors: ["Black", "Gray"],
            swatchType: "Super 120s",
            lengthMeters: 38,
            pricePerMeter: 110,
            createdAt: "2024-01-05T00:00:00.000Z"
          },
          {
            id: "fab-006",
            slug: "luxury-fabric-series",
            name: "Luxury Fabric Series",
            images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop"],
            pattern: "Premium",
            colors: ["Blue", "White"],
            swatchType: "Super 140s",
            lengthMeters: 30,
            pricePerMeter: 135,
            createdAt: "2024-01-06T00:00:00.000Z"
          },
          {
            id: "fab-007",
            slug: "artisan-collection", 
            name: "Artisan Collection",
            images: ["https://images.unsplash.com/photo-1566479179817-0a7fbfce43da?w=400&h=500&fit=crop"],
            pattern: "Handwoven",
            colors: ["Green", "Brown"],
            swatchType: "Artisan",
            lengthMeters: 20,
            pricePerMeter: 98,
            createdAt: "2024-01-07T00:00:00.000Z"
          },
          {
            id: "fab-008",
            slug: "designer-patterns",
            name: "Designer Patterns",
            images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop"],
            pattern: "Designer",
            colors: ["Multi", "Colorful"], 
            swatchType: "Designer Mix",
            lengthMeters: 45,
            pricePerMeter: 115,
            createdAt: "2024-01-08T00:00:00.000Z"
          }
        ]
        
        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading fabrics:', error)
        setLoading(false)
      }
    }

    loadFabrics()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Background Collage */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image Collage */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-oguzhan-karaca-1920519-3544567.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-pixabay-325876.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-tima-miroshnichenko-6766360.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-tima-miroshnichenko-6766365.jpg)'}}
          ></div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Premium Fabrics
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              Discover our curated collection of high-quality textiles and modern designs
            </motion.p>
            <motion.a 
              href="/products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Collection
            </motion.a>
          </div>
        </div>
      </div>

      {/* New Collection Mosaic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">New Collection</h2>
          <p className="text-gray-600">Discover our latest textile designs and patterns</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-96">
          {/* Large image - spans 2 columns */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop" 
              alt="New Collection Feature"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Featured Design</h3>
              <p className="text-sm opacity-90">Modern Patterns</p>
            </div>
          </div>
          
          {/* Small images */}
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Products</h2>
          <div className="text-coral-500 font-medium">8 products</div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }
            }
          }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                <motion.img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {product.name}
                </h3>
                
                {/* Price */}
                <p className="text-coral-500 font-bold text-lg">
                  ${product.pricePerMeter}/meter
                </p>

                {/* Pattern */}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Pattern:</span>
                  <span className="ml-2">{product.pattern}</span>
                </div>

                {/* Colors */}
                <div>
                  <span className="text-sm font-medium text-gray-600">Colors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.colors.map((color, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stock Level */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Stock:</span>
                    <span className={`ml-2 font-semibold ${
                      product.lengthMeters > 20 ? 'text-green-600' : 
                      product.lengthMeters > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.lengthMeters > 0 ? `${product.lengthMeters}m` : 'Out of Stock'}
                    </span>
                  </div>
                  
                  {/* Stock Status Indicator */}
                  <div className={`w-3 h-3 rounded-full ${
                    product.lengthMeters > 20 ? 'bg-green-500' : 
                    product.lengthMeters > 0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href="/products" 
            className="inline-block border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
          >
            See all
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPattern, setSelectedPattern] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    // Load all products
    const loadProducts = async () => {
      try {
        const mockProducts = [
          {
            id: "fab-001",
            slug: "premium-wool-navy", 
            name: "A Young Woman in Colorful Jacket",
            images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop"],
            pattern: "Solid",
            colors: ["Pink", "Green", "Yellow"],
            swatchType: "Super 120s",
            lengthMeters: 50,
            pricePerMeter: 108,
            createdAt: "2024-01-01T00:00:00.000Z"
          },
          {
            id: "fab-002",
            slug: "modern-casual-jacket",
            name: "Modern Casual Jacket", 
            images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop"],
            pattern: "Contemporary",
            colors: ["Orange", "Blue"],
            swatchType: "Super 130s",
            lengthMeters: 35,
            pricePerMeter: 95,
            createdAt: "2024-01-02T00:00:00.000Z"
          },
          {
            id: "fab-003", 
            slug: "premium-fabric-collection",
            name: "Premium Fabric Collection",
            images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop"],
            pattern: "Textured",
            colors: ["Pink", "White"],
            swatchType: "Silk Mix",
            lengthMeters: 25,
            pricePerMeter: 120,
            createdAt: "2024-01-03T00:00:00.000Z"
          },
          {
            id: "fab-004",
            slug: "elegant-textile-design",
            name: "Elegant Textile Design",
            images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop"],
            pattern: "Classic",
            colors: ["Beige", "Cream"],
            swatchType: "Super 110s", 
            lengthMeters: 42,
            pricePerMeter: 85,
            createdAt: "2024-01-04T00:00:00.000Z"
          },
          {
            id: "fab-005",
            slug: "contemporary-style",
            name: "Contemporary Style",
            images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"],
            pattern: "Modern",
            colors: ["Black", "Gray"],
            swatchType: "Super 120s",
            lengthMeters: 38,
            pricePerMeter: 110,
            createdAt: "2024-01-05T00:00:00.000Z"
          },
          {
            id: "fab-006",
            slug: "luxury-fabric-series",
            name: "Luxury Fabric Series",
            images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop"],
            pattern: "Premium",
            colors: ["Blue", "White"],
            swatchType: "Super 140s",
            lengthMeters: 30,
            pricePerMeter: 135,
            createdAt: "2024-01-06T00:00:00.000Z"
          },
          {
            id: "fab-007",
            slug: "artisan-collection", 
            name: "Artisan Collection",
            images: ["https://images.unsplash.com/photo-1566479179817-0a7fbfce43da?w=400&h=500&fit=crop"],
            pattern: "Handwoven",
            colors: ["Green", "Brown"],
            swatchType: "Artisan",
            lengthMeters: 20,
            pricePerMeter: 98,
            createdAt: "2024-01-07T00:00:00.000Z"
          },
          {
            id: "fab-008",
            slug: "designer-patterns",
            name: "Designer Patterns",
            images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop"],
            pattern: "Designer",
            colors: ["Multi", "Colorful"], 
            swatchType: "Designer Mix",
            lengthMeters: 45,
            pricePerMeter: 115,
            createdAt: "2024-01-08T00:00:00.000Z"
          },
          {
            id: "fab-009",
            slug: "vintage-tweed",
            name: "Vintage Tweed Pattern",
            images: ["https://images.unsplash.com/photo-1489370321024-e0834ad8b2e2?w=400&h=500&fit=crop"],
            pattern: "Tweed",
            colors: ["Brown", "Tan"],
            swatchType: "Super 100s",
            lengthMeters: 0,
            pricePerMeter: 88,
            createdAt: "2024-01-09T00:00:00.000Z"
          },
          {
            id: "fab-010",
            slug: "silk-stripe",
            name: "Silk Stripe Collection",
            images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop"],
            pattern: "Striped",
            colors: ["Navy", "Gold"],
            swatchType: "Pure Silk",
            lengthMeters: 15,
            pricePerMeter: 145,
            createdAt: "2024-01-10T00:00:00.000Z"
          }
        ]
        
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading products:', error)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.colors.some(color => color.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesPattern = !selectedPattern || product.pattern === selectedPattern
      const matchesColor = !selectedColor || product.colors.some(color => color.toLowerCase().includes(selectedColor.toLowerCase()))
      const matchesStock = !inStockOnly || product.lengthMeters > 0

      return matchesSearch && matchesPattern && matchesColor && matchesStock
    })

    // Sort products
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.pricePerMeter - b.pricePerMeter)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.pricePerMeter - a.pricePerMeter)
    } else if (sortBy === 'stock') {
      filtered.sort((a, b) => b.lengthMeters - a.lengthMeters)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedPattern, selectedColor, inStockOnly, sortBy])

  // Get unique patterns and colors for filter options
  const uniquePatterns = [...new Set(products.map(p => p.pattern))]
  const uniqueColors = [...new Set(products.flatMap(p => p.colors))]

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedPattern('')
    setSelectedColor('')
    setInStockOnly(false)
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search and Filters Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Browse our complete collection of premium fabrics</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products, patterns, colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Pattern Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
              <select
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="">All Patterns</option>
                {uniquePatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="">All Colors</option>
                {uniqueColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div className="flex items-center py-3">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">In stock only</label>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length > 0 
                ? `Showing ${filteredProducts.length} of ${products.length} products` 
                : 'No products found'}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                }
              }
            }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <motion.img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <p className="text-coral-500 font-bold text-lg">
                      ${product.pricePerMeter}/meter
                    </p>

                    {/* Pattern */}
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Pattern:</span>
                      <span className="ml-2">{product.pattern}</span>
                    </div>

                    {/* Colors */}
                    <div>
                      <span className="text-sm font-medium text-gray-600">Colors:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.colors.map((color, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stock Level */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium text-gray-600">Stock:</span>
                        <span className={`ml-2 font-semibold ${
                          product.lengthMeters > 20 ? 'text-green-600' : 
                          product.lengthMeters > 0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {product.lengthMeters > 0 ? `${product.lengthMeters}m` : 'Out of Stock'}
                        </span>
                      </div>
                      
                      {/* Stock Status Indicator */}
                      <div className={`w-3 h-3 rounded-full ${
                        product.lengthMeters > 20 ? 'bg-green-500' : 
                        product.lengthMeters > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Monza Tekstil</h1>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 font-semibold">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">About Monza Tekstil</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 mb-6">
            Founded in 1995, Monza Tekstil is a leading provider of premium quality fabrics and textiles. 
            We specialize in high-end materials for fashion, upholstery, and industrial applications.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our commitment to quality and customer service has made us a trusted partner for designers, 
            manufacturers, and businesses worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">25+ Years</h3>
              <p className="text-gray-600">Experience in textiles</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">1000+</h3>
              <p className="text-gray-600">Happy customers</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">50+</h3>
              <p className="text-gray-600">Countries served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Monza Tekstil</h1>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 font-semibold">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 mb-6">
            Get in touch with us for all your textile needs.
          </p>
          <div className="space-y-4">
            <p><strong>Phone:</strong> +90 532 123 4567</p>
            <p><strong>Email:</strong> info@monzatekstil.com</p>
            <p><strong>Address:</strong> Istanbul, Turkey</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/catalog" element={<ProductsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App