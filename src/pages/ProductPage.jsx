import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useLanguage } from '../components/LanguageContext'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
}

export default function ProductPage() {
  const { slug } = useParams()
  const { t } = useLanguage()

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Product Details
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Product: {slug}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Product pages are coming soon. For specific product inquiries, please contact us directly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}