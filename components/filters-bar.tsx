'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiltersBarProps, FabricFilters } from '@/lib/types';

interface FilterOption {
  label: string;
  value: string;
}

export default function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableOptions, setAvailableOptions] = useState({
    patterns: [] as FilterOption[],
    colors: [] as FilterOption[],
    swatchTypes: [] as FilterOption[],
  });

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setAvailableOptions({
      patterns: [
        { label: 'All', value: '' },
        { label: 'Solid', value: 'Solid' },
        { label: 'Pinstripe', value: 'Pinstripe' },
        { label: 'Herringbone', value: 'Herringbone' },
        { label: 'Check', value: 'Check' },
        { label: 'Tweed', value: 'Tweed' },
        { label: 'Windowpane', value: 'Windowpane' },
      ],
      colors: [
        { label: 'All', value: '' },
        { label: 'Navy Blue', value: 'Navy Blue' },
        { label: 'Charcoal Gray', value: 'Charcoal Gray' },
        { label: 'Dark Brown', value: 'Dark Brown' },
        { label: 'Light Gray', value: 'Light Gray' },
        { label: 'Forest Green', value: 'Forest Green' },
        { label: 'Midnight Black', value: 'Midnight Black' },
      ],
      swatchTypes: [
        { label: 'All', value: '' },
        { label: 'Super 110s', value: 'Super 110s' },
        { label: 'Super 120s', value: 'Super 120s' },
        { label: 'Super 130s', value: 'Super 130s' },
        { label: 'Silk Mix', value: 'Silk Mix' },
        { label: 'Linen Mix', value: 'Linen Mix' },
      ],
    });
  }, []);

  const updateFilter = (key: keyof FabricFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setIsExpanded(false);
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value !== undefined && value !== '' && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Toggle Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </button>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Active Filters Pills */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {filters.pattern && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge variant="outline" className="pr-1">
                    Pattern: {filters.pattern}
                    <button
                      onClick={() => updateFilter('pattern', '')}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}

              {filters.colors && filters.colors.length > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge variant="outline" className="pr-1">
                    Colors: {filters.colors.join(', ')}
                    <button
                      onClick={() => updateFilter('colors', [])}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}

              {filters.swatchType && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge variant="outline" className="pr-1">
                    Type: {filters.swatchType}
                    <button
                      onClick={() => updateFilter('swatchType', '')}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}

              {filters.inStock !== undefined && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Badge variant="outline" className="pr-1">
                    {filters.inStock ? 'In Stock' : 'Out of Stock'}
                    <button
                      onClick={() => updateFilter('inStock', undefined)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {/* Pattern Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pattern
                </label>
                <select
                  value={filters.pattern || ''}
                  onChange={(e) => updateFilter('pattern', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  {availableOptions.patterns.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swatch Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Swatch Type
                </label>
                <select
                  value={filters.swatchType || ''}
                  onChange={(e) => updateFilter('swatchType', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  {availableOptions.swatchTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={
                    filters.priceRange 
                      ? `${filters.priceRange.min}-${filters.priceRange.max}`
                      : ''
                  }
                  onChange={(e) => {
                    if (e.target.value === '') {
                      updateFilter('priceRange', undefined);
                    } else {
                      const [min, max] = e.target.value.split('-').map(Number);
                      updateFilter('priceRange', { min, max });
                    }
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="">All Prices</option>
                  <option value="0-75">Under $75</option>
                  <option value="75-100">$75 - $100</option>
                  <option value="100-150">$100 - $150</option>
                  <option value="150-1000">Over $150</option>
                </select>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={
                    filters.inStock === undefined 
                      ? '' 
                      : filters.inStock 
                        ? 'true' 
                        : 'false'
                  }
                  onChange={(e) => {
                    if (e.target.value === '') {
                      updateFilter('inStock', undefined);
                    } else {
                      updateFilter('inStock', e.target.value === 'true');
                    }
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="">All Items</option>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}