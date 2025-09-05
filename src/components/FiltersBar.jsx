import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Search, Filter, X, ChevronDown } from 'lucide-react'

export default function FiltersBar({ filters, onFiltersChange }) {
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [activeFilters, setActiveFilters] = useState(filters)

  // Pattern options
  const patternOptions = [
    'Solid', 'Striped', 'Floral', 'Geometric', 'Abstract', 'Textured'
  ]

  // Color options
  const colorOptions = [
    'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 
    'Pink', 'Brown', 'Black', 'White', 'Gray', 'Beige'
  ]

  // Swatch type options
  const swatchTypeOptions = [
    'Cotton', 'Silk', 'Wool', 'Linen', 'Polyester', 'Blend'
  ]

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleFilterChange('search', searchTerm)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters }
    
    if (value === '' || value === undefined || value === null) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    
    setActiveFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleColorToggle = (color) => {
    const currentColors = activeFilters.colors || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color]
    
    handleFilterChange('colors', newColors.length > 0 ? newColors : undefined)
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setActiveFilters({})
    onFiltersChange({})
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (activeFilters.pattern) count++
    if (activeFilters.colors?.length) count++
    if (activeFilters.swatchType) count++
    if (activeFilters.search) count++
    if (activeFilters.inStock !== undefined) count++
    if (activeFilters.priceRange) count++
    return count
  }

  const containerVariants = {
    collapsed: { height: 'auto' },
    expanded: { height: 'auto' }
  }

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: 'auto' }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Filter Bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search fabrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFiltersCount()}
                </Badge>
              )}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>

          {/* Active Filters Summary */}
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {Object.entries(activeFilters).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null
                
                let displayValue = value
                if (key === 'colors' && Array.isArray(value)) {
                  displayValue = value.join(', ')
                } else if (key === 'inStock') {
                  displayValue = value ? 'In Stock' : 'Out of Stock'
                }
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span className="text-xs">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {String(displayValue)}
                      </span>
                      <button
                        onClick={() => handleFilterChange(key, undefined)}
                        className="hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 space-y-6 border-t border-gray-100 pt-6">
                {/* Pattern Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Pattern
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {patternOptions.map((pattern) => (
                      <Button
                        key={pattern}
                        variant={activeFilters.pattern === pattern ? "default" : "outline"}
                        size="sm"
                        onClick={() => 
                          handleFilterChange('pattern', activeFilters.pattern === pattern ? undefined : pattern)
                        }
                      >
                        {pattern}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <Button
                        key={color}
                        variant={activeFilters.colors?.includes(color) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleColorToggle(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Swatch Type Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Material
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {swatchTypeOptions.map((type) => (
                      <Button
                        key={type}
                        variant={activeFilters.swatchType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => 
                          handleFilterChange('swatchType', activeFilters.swatchType === type ? undefined : type)
                        }
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Availability
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={activeFilters.inStock === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => 
                        handleFilterChange('inStock', activeFilters.inStock === true ? undefined : true)
                      }
                    >
                      In Stock
                    </Button>
                    <Button
                      variant={activeFilters.inStock === false ? "default" : "outline"}
                      size="sm"
                      onClick={() => 
                        handleFilterChange('inStock', activeFilters.inStock === false ? undefined : false)
                      }
                    >
                      Out of Stock
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2 max-w-md">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={activeFilters.priceRange?.min || ''}
                      onChange={(e) => {
                        const min = e.target.value ? parseFloat(e.target.value) : undefined
                        const max = activeFilters.priceRange?.max
                        handleFilterChange('priceRange', 
                          min || max ? { min, max } : undefined
                        )
                      }}
                      className="w-20"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={activeFilters.priceRange?.max || ''}
                      onChange={(e) => {
                        const max = e.target.value ? parseFloat(e.target.value) : undefined
                        const min = activeFilters.priceRange?.min
                        handleFilterChange('priceRange', 
                          min || max ? { min, max } : undefined
                        )
                      }}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">USD</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}