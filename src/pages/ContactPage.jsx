import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../components/LanguageContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { toast } from '../components/ui/use-toast'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ExternalLink } from 'lucide-react'
import { submitContact } from '../services/dataService'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').or(z.literal('')),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
}).refine((data) => data.email || data.phone, {
  message: "Please provide either email or phone number",
  path: ["email"],
})

export default function ContactPage() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'inquiry', label: 'General Inquiry' },
    { value: 'quotation', label: 'Request Quotation' },
    { value: 'custom-order', label: 'Custom Order' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'other', label: 'Other' }
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      const result = await submitContact(data)

      if (result.success) {
        toast({
          title: t('contact.form.successTitle'),
          description: 'Thank you for contacting us. We\'ll get back to you soon.',
        })
        reset()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+90 532 747 3215',
      color: 'text-green-600 bg-green-50',
      link: 'tel:+905327473215',
      linkType: 'tel'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+90 532 747 3215',
      color: 'text-emerald-600 bg-emerald-50',
      link: 'https://wa.me/905327473215',
      linkType: 'external'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'monzakumas@gmail.com',
      color: 'text-purple-600 bg-purple-50',
      link: 'mailto:monzakumas@gmail.com',
      linkType: 'mailto'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Tekstil Sitesi, 1. Cadde No: 123, Beyoğlu, İstanbul, Turkey',
      color: 'text-blue-600 bg-blue-50',
      link: 'https://maps.app.goo.gl/i7PTquLjbqGZFnSL9',
      linkType: 'external'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM',
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Get in touch with our textile experts for premium fabrics and custom solutions
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Have questions about our fabrics or need a custom solution? We're here to help.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  ⏱️ We respond within 24 hours
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                const content = (
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        {item.title}
                        {item.link && <ExternalLink className="w-4 h-4 opacity-50" />}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                )

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (0.1 * index) }}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.linkType === 'external' ? '_blank' : undefined}
                        rel={item.linkType === 'external' ? 'noopener noreferrer' : undefined}
                        className="block hover:bg-gray-50 p-4 rounded-xl transition-colors cursor-pointer"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="p-4">
                        {content}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email OR Phone (at least one required) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="+90 5xx xxx xx xx"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  * Please provide either email or phone number
                </p>
                
                {(errors.email || errors.phone) && (
                  <p className="text-sm text-red-600">
                    Please provide either email or phone number
                  </p>
                )}

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    {...register('subject')}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.subject ? 'border-red-500' : ''}`}
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    placeholder="Tell us about your fabric needs..."
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}