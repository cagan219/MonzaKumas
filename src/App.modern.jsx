import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { Toaster } from './components/ui/toaster'

// Modern Component Imports
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

// Sample fabric data
const sampleFabrics = [
  {
    id: 1,
    name: "Premium Wool Blend",
    pattern: "Solid",
    colors: ["Navy", "Charcoal", "Black"],
    stockQty: 45,
    pricePerMeter: 89,
    originalPrice: 120,
    swatchType: "Wool Blend",
    images: ["/images/pexels-pixabay-325876.jpg"],
    rating: 4.8,
    slug: "premium-wool-blend"
  },
  {
    id: 2,
    name: "Contemporary Cotton",
    pattern: "Textured",
    colors: ["White", "Cream", "Light Gray"],
    stockQty: 32,
    pricePerMeter: 45,
    swatchType: "Cotton",
    images: ["/images/pexels-tima-miroshnichenko-6766360.jpg"],
    rating: 4.6,
    slug: "contemporary-cotton"
  },
  {
    id: 3,
    name: "Luxury Silk Collection",
    pattern: "Classic",
    colors: ["Burgundy", "Gold", "Emerald"],
    stockQty: 0,
    pricePerMeter: 150,
    originalPrice: 200,
    swatchType: "Silk",
    images: ["/images/pexels-oguzhan-karaca-1920519-3544567.jpg"],
    rating: 4.9,
    slug: "luxury-silk-collection"
  },
  {
    id: 4,
    name: "Technical Performance Fabric",
    pattern: "Contemporary",
    colors: ["Black", "Navy", "Charcoal", "Gray"],
    stockQty: 67,
    pricePerMeter: 75,
    swatchType: "Synthetic Blend",
    images: ["/images/pexels-tima-miroshnichenko-6766365.jpg"],
    rating: 4.7,
    slug: "technical-performance-fabric"
  }
]

function HomePage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.featured.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleFabrics.map((fabric) => (
              <ProductCard key={fabric.id} fabric={fabric} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CatalogPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pages.catalog.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('pages.catalog.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleFabrics.concat(sampleFabrics).map((fabric, index) => (
            <ProductCard key={`${fabric.id}-${index}`} fabric={{...fabric, id: `${fabric.id}-${index}`}} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pages.about.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('pages.about.subtitle')}
          </p>
        </div>
        
        <div className="prose prose-lg mx-auto">
          <p>
            Founded in 1995, Monza Tekstil is one of the pioneering companies that combines quality and innovation in the textile industry. With years of experience and the power of modern technology, we aim to provide the best service to our customers.
          </p>
          
          <h2>Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 not-prose">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">We maintain the highest quality standards in every product</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">We act with a continuous development and innovation approach</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600 text-sm">Customer satisfaction is our priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pages.contact.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('pages.contact.subtitle')}
          </p>
        </div>
        
        <OrderForm />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          <Footer />
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  )
}