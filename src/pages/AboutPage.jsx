import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../components/LanguageContext'
import { Award, Users, Clock, Globe } from 'lucide-react'

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
      delayChildren: 0.3,
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

export default function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: Award,
      number: "25+",
      label: t('about.stats.experience'),
      color: "text-blue-600"
    },
    {
      icon: Users,
      number: "1000+",
      label: t('about.stats.customers'),
      color: "text-green-600"
    },
    {
      icon: Clock,
      number: "24/7",
      label: t('about.stats.support'),
      color: "text-purple-600"
    },
    {
      icon: Globe,
      number: "50+",
      label: t('about.stats.countries'),
      color: "text-orange-600"
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
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
{t('about.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
{t('about.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Story Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
  {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t('about.story.paragraph1')}</p>
                <p>{t('about.story.paragraph2')}</p>
                <p>{t('about.story.paragraph3')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">🧵</div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="py-16 bg-gray-50 rounded-2xl">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
{t('about.impact.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="text-center"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-white shadow-sm ${stat.color} mb-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
{t('about.mission.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
{t('about.mission.description')}
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('about.values.quality.title'),
                description: t('about.values.quality.description'),
                emoji: '⭐'
              },
              {
                title: t('about.values.sustainability.title'),
                description: t('about.values.sustainability.description'),
                emoji: '🌱'
              },
              {
                title: t('about.values.innovation.title'),
                description: t('about.values.innovation.description'),
                emoji: '💡'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (0.1 * index) }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}