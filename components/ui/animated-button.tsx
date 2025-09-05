'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const animatedButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600',
        glow: 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      animation: {
        none: '',
        scale: '',
        bounce: '',
        pulse: '',
        wiggle: '',
        shake: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'scale',
    },
  }
);

const animationVariants = {
  scale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  bounce: {
    rest: { y: 0 },
    hover: { y: -2 },
    tap: { y: 0 },
  },
  pulse: {
    rest: { scale: 1 },
    hover: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    tap: { scale: 0.95 },
  },
  wiggle: {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -3, 3, -3, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    tap: { rotate: 0 },
  },
  shake: {
    rest: { x: 0 },
    hover: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    tap: { x: 0 },
  },
};

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'size'>,
    VariantProps<typeof animatedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation = 'scale',
    loading = false,
    loadingText,
    children,
    disabled,
    ...props 
  }, ref) => {
    const selectedAnimation = animationVariants[animation as keyof typeof animationVariants] || animationVariants.scale;

    return (
      <motion.button
        className={cn(animatedButtonVariants({ variant, size, animation, className }))}
        variants={selectedAnimation}
        initial="rest"
        whileHover={!disabled && !loading ? 'hover' : 'rest'}
        whileTap={!disabled && !loading ? 'tap' : 'rest'}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration: 0.2,
        }}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mr-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            />
          </motion.div>
        )}
        <motion.span
          initial={loading ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: loading && loadingText ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.span>
        {loading && loadingText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {loadingText}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

// Predefined animated button types for common use cases
export const PrimaryButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton variant="default" animation="scale" ref={ref} {...props} />
  )
);

export const GradientButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton variant="gradient" animation="bounce" ref={ref} {...props} />
  )
);

export const GlowButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton variant="glow" animation="pulse" ref={ref} {...props} />
  )
);

export const WiggleButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton variant="outline" animation="wiggle" ref={ref} {...props} />
  )
);

export { AnimatedButton, animatedButtonVariants };