import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLanguage } from './LanguageContext'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { ShoppingCart, Minus, Plus, Package } from 'lucide-react'
import { submitOrder } from '../services/dataService'

const orderSchema = z.object({
  qtyMeters: z.number().min(0.5, 'Minimum order is 0.5 meters').max(1000, 'Maximum order is 1000 meters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  note: z.string().optional(),
})

export default function OrderForm({ product }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      qtyMeters: 1,
      name: '',
      email: '',
      phone: '',
      note: '',
    }
  })

  const adjustQuantity = (delta) => {
    const newQuantity = Math.max(0.5, Math.min(product.stockQty, quantity + delta))
    setQuantity(newQuantity)
    setValue('qtyMeters', newQuantity)
  }

  const onSubmit = async (data) => {
    if (data.qtyMeters > product.stockQty) {
      toast({
        title: 'Order Error',
        description: 'Insufficient stock for this quantity.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsSubmitting(true)

      const orderData = {
        productId: product.id,
        qtyMeters: data.qtyMeters,
        name: data.name,
        email: data.email,
        phone: data.phone,
        note: data.note,
      }

      const result = await submitOrder(orderData)

      if (result.success) {
        toast({
          title: 'Order Placed!',
          description: 'Your order has been submitted successfully. We\'ll contact you soon.',
        })
        navigate('/order-success', { 
          state: { 
            orderId: result.data.orderId,
            product: product,
            quantity: data.qtyMeters,
          }
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Order submission error:', error)
      toast({
        title: 'Order Error',
        description: 'Failed to submit order. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (product.stockQty === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-6 text-center"
      >
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Out of Stock
        </h3>
        <p className="text-gray-600 mb-4">
          This product is currently out of stock. Contact us for availability updates.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </Button>
      </motion.div>
    )
  }

  const totalPrice = (quantity * product.pricePerMeter).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-gray-200 rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
        <ShoppingCart className="w-5 h-5" />
        <span>Place Order</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (meters)
          </label>
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => adjustQuantity(-0.5)}
              disabled={quantity <= 0.5}
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <Input
              type="number"
              step="0.5"
              min="0.5"
              max={product.stockQty}
              value={quantity}
              onChange={(e) => {
                const value = Math.max(0.5, Math.min(product.stockQty, parseFloat(e.target.value) || 0))
                setQuantity(value)
                setValue('qtyMeters', value)
              }}
              {...register('qtyMeters', { valueAsNumber: true })}
              className="w-20 text-center"
            />
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => adjustQuantity(0.5)}
              disabled={quantity >= product.stockQty}
            >
              <Plus className="w-4 h-4" />
            </Button>

            <span className="text-sm text-gray-500">
              / {product.stockQty}m available
            </span>
          </div>
          {errors.qtyMeters && (
            <p className="text-sm text-red-600 mt-1">
              {errors.qtyMeters.message}
            </p>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {quantity}m × ${product.pricePerMeter} per meter
            </span>
            <span className="font-medium text-gray-900">
              ${totalPrice}
            </span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Customer Information</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <Textarea
              id="note"
              rows={3}
              {...register('note')}
              placeholder="Any special requirements or notes..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Place Order - ${totalPrice}</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By placing this order, you agree to our terms and conditions. We'll contact you to confirm details and arrange payment.
        </p>
      </form>
    </motion.div>
  )
}