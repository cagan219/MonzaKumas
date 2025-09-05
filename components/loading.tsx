'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const dotsVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration: 1.4
    }
  }
};

const dotVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export function SpinnerLoading({ size = 'md', text }: Pick<LoadingProps, 'size' | 'text'>) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className="flex items-center justify-center"
      >
        <Loader2 className={`${sizeClasses[size]} text-gray-600`} />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function DotsLoading({ text }: Pick<LoadingProps, 'text'>) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        variants={dotsVariants}
        animate="animate"
        className="flex space-x-2"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            className="w-3 h-3 bg-gray-600 rounded-full"
          />
        ))}
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function PulseLoading({ text }: Pick<LoadingProps, 'text'>) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center"
      >
        <motion.div
          className="w-8 h-8 bg-gray-600 rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
    >
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-md mb-4"
      />
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.1,
        }}
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded mb-2"
      />
      <motion.div
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.2,
        }}
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded w-2/3"
      />
    </motion.div>
  );
}

export default function Loading({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false 
}: LoadingProps) {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center'
    : 'flex items-center justify-center py-20';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClasses}
    >
      <SpinnerLoading size={size} text={text} />
    </motion.div>
  );
}