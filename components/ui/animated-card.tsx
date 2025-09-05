'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost' | 'gradient';
  hoverEffect?: 'lift' | 'scale' | 'rotate' | 'glow' | 'none';
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-card text-card-foreground shadow-sm border',
  elevated: 'bg-card text-card-foreground shadow-lg border',
  outline: 'border-2 bg-card text-card-foreground',
  ghost: 'bg-card/50 text-card-foreground backdrop-blur-sm',
  gradient: 'bg-gradient-to-br from-card to-card/80 text-card-foreground shadow-lg border border-white/20',
};

const hoverEffects = {
  lift: {
    rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    hover: { 
      y: -8, 
      boxShadow: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  },
  scale: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  },
  rotate: {
    rest: { rotateY: 0, rotateX: 0 },
    hover: { 
      rotateY: 5, 
      rotateX: 5,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  },
  glow: {
    rest: { 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderColor: 'transparent'
    },
    hover: { 
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  },
  none: {
    rest: {},
    hover: {}
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    className, 
    variant = 'default', 
    hoverEffect = 'lift',
    children, 
    ...props 
  }, ref) => {
    const selectedHoverEffect = hoverEffects[hoverEffect];
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg p-6 transition-colors',
          cardVariants[variant],
          className
        )}
        variants={{
          ...selectedHoverEffect,
          ...containerVariants,
        }}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        {...props}
      >
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    variants={itemVariants}
    {...props}
  />
));

AnimatedCardHeader.displayName = 'AnimatedCardHeader';

export const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    variants={itemVariants}
    {...props}
  />
));

AnimatedCardTitle.displayName = 'AnimatedCardTitle';

export const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    variants={itemVariants}
    {...props}
  />
));

AnimatedCardDescription.displayName = 'AnimatedCardDescription';

export const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div 
    ref={ref} 
    className={cn('p-6 pt-0', className)}
    variants={itemVariants}
    {...props} 
  />
));

AnimatedCardContent.displayName = 'AnimatedCardContent';

export const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    variants={itemVariants}
    {...props}
  />
));

AnimatedCardFooter.displayName = 'AnimatedCardFooter';