import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { Badge } from './ui/badge'
import { Eye, ShoppingCart } from 'lucide-react'

export default function ProductCard({ fabric }) {
  const { t, language } = useLanguage()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${fabric.slug}`)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.01,
        y: -4,
        boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <motion.div
          className="w-full h-full"
          variants={imageVariants}
          whileHover="hover"
        >
          {fabric.images && fabric.images.length > 0 ? (
            <motion.img
              layoutId={`img-${fabric.id}`}
              src={fabric.images[0]}
              alt={fabric.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-4xl text-gray-400">🧵</div>
            </div>
          )}
        </motion.div>

        {/* Stock Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={fabric.stockQty > 0 ? "success" : "destructive"}
            className="shadow-sm"
          >
            {fabric.stockQty > 0 
              ? `${fabric.stockQty}m Available`
              : 'Out of Stock'
            }
          </Badge>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
            {fabric.stockQty > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
          {fabric.name}
        </h3>

        {/* Attributes */}
        <div className="space-y-2">
          {fabric.pattern && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">Pattern:</span>
              <span>{fabric.pattern}</span>
            </div>
          )}
          
          {fabric.colors && fabric.colors.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">Colors:</span>
              <div className="flex flex-wrap gap-1">
                {fabric.colors.slice(0, 2).map((color, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {color}
                  </span>
                ))}
                {fabric.colors.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{fabric.colors.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900">
              ${fabric.pricePerMeter}
            </span>
            <span className="text-sm text-gray-500">
              per meter
            </span>
          </div>
          
          {fabric.originalPrice && fabric.originalPrice > fabric.pricePerMeter && (
            <span className="text-sm text-gray-400 line-through">
              ${fabric.originalPrice}
            </span>
          )}
        </div>

        {/* Quick Info */}
        {fabric.swatchType && (
          <div className="text-xs text-gray-500">
            Material: {fabric.swatchType}
          </div>
        )}
      </div>
    </motion.div>
  )
}