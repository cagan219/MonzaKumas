import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../components/LanguageContext'
import { Button } from '../components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
}

export default function NotFound() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen bg-white flex items-center justify-center px-4"
    >
      <div className="max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <div className="text-6xl mb-6">🧵</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
{t('notFound.title')}
          </h1>
          <p className="text-gray-600 leading-relaxed">
{t('notFound.message')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
{t('notFound.goHome')}
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
{t('notFound.goBack')}
          </Button>
          
          <Button
            onClick={() => navigate('/catalog')}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Search className="w-4 h-4 mr-2" />
{t('notFound.browseCatalog')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-sm text-gray-500"
        >
{t('notFound.helpText')}
        </motion.div>
      </div>
    </motion.div>
  )
}