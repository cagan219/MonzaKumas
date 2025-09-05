'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ProductCardProps } from '@/lib/types';

export default function ProductCard({ product, locale = 'tr' }: ProductCardProps) {
  const name = product.name[locale as keyof typeof product.name] || product.name.tr;
  const description = product.description[locale as keyof typeof product.description] || product.description.tr;

  return (
    <Link href={`/${locale}/products/${product.slug}`}>
      <motion.div
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2, ease: 'easeOut' }
        }}
        whileTap={{ scale: 0.98 }}
        className="group bg-white rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg border border-gray-200"
      >
        {/* Image Container with layoutId for shared animation */}
        <motion.div
          layoutId={`img-${product.id}`}
          className="aspect-square bg-gray-100 relative overflow-hidden"
        >
          {/* Placeholder for actual fabric image */}
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {product.swatchType}
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                {product.pattern}
              </p>
            </div>
          </div>

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={product.inStock ? "default" : "destructive"}
              className="text-xs"
            >
              {product.inStock 
                ? (locale === 'tr' ? 'Stokta' : 'In Stock')
                : (locale === 'tr' ? 'Tükendi' : 'Out of Stock')
              }
            </Badge>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
            >
              {locale === 'tr' ? 'Detayları Gör' : 'View Details'}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-heading font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Fabric Details */}
          <div className="mb-3 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{locale === 'tr' ? 'Desen' : 'Pattern'}:</span>
              <span className="font-medium">{product.pattern}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{locale === 'tr' ? 'Tip' : 'Type'}:</span>
              <span className="font-medium">{product.swatchType}</span>
            </div>
            {product.inStock && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{locale === 'tr' ? 'Mevcut' : 'Available'}:</span>
                <span className="font-medium">{product.lengthMeters}m</span>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">
              {locale === 'tr' ? 'Renkler' : 'Colors'}:
            </p>
            <div className="flex flex-wrap gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {color}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.pricePerMeter}
            </span>
            <span className="text-sm text-gray-500">
              {locale === 'tr' ? '/metre' : '/meter'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}