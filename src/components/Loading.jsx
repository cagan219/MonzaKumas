import React from 'react'
import { motion } from 'framer-motion'

// Skeleton Card Component
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        {/* Attributes */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  )
}

// Page Loading Spinner
export const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

// Inline Loading Spinner
export const InlineLoader = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`${sizeClasses[size]} border-gray-200 border-t-blue-600 rounded-full ${className}`}
    />
  )
}

// Pulsing Dots Loader
export const DotsLoader = ({ className = "" }) => {
  const dotVariants = {
    animate: (i) => ({
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={dotVariants}
          animate="animate"
          className="w-2 h-2 bg-blue-600 rounded-full"
        />
      ))}
    </div>
  )
}

// Button Loading State
export const ButtonLoader = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {isLoading ? (
        <>
          <InlineLoader size="sm" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Grid Loading State
export const GridLoader = ({ count = 8, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

// Text Loading Skeleton
export const TextSkeleton = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => {
        const width = index === lines - 1 ? 'w-2/3' : 'w-full'
        return (
          <div
            key={index}
            className={`h-4 bg-gray-200 rounded ${width}`}
          />
        )
      })}
    </div>
  )
}

// Image Loading Skeleton
export const ImageSkeleton = ({ aspectRatio = "square", className = "" }) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  }

  return (
    <div className={`bg-gray-200 animate-pulse rounded-lg ${aspectClasses[aspectRatio]} ${className}`} />
  )
}

// Progress Bar
export const ProgressBar = ({ progress = 0, className = "" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="bg-blue-600 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  )
}

// Fade In Animation Wrapper
export const FadeIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger Container
export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger Item (use inside StaggerContainer)
export const StaggerItem = ({ children, className = "" }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export default {
  SkeletonCard,
  PageLoader,
  InlineLoader,
  DotsLoader,
  ButtonLoader,
  GridLoader,
  TextSkeleton,
  ImageSkeleton,
  ProgressBar,
  FadeIn,
  StaggerContainer,
  StaggerItem,
}