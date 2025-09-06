import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import { Button } from './ui/button'
import { InteractiveHoverButton } from './ui/interactive-button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleCTAClick = () => {
    navigate('/catalog')
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Industrial Textile Background */}
      <div className="absolute inset-0">
        {/* Background Images Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="relative overflow-hidden">
            <img 
              src="/images/pexels-pixabay-325876.jpg" 
              alt="Textile Manufacturing"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="/images/pexels-oguzhan-karaca-1920519-3544567.jpg" 
              alt="Fabric Production"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="/images/pexels-tima-miroshnichenko-6766360.jpg" 
              alt="Industrial Textiles"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="/images/pexels-tima-miroshnichenko-6766365.jpg" 
              alt="Fabric Details"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/80 to-black/90"></div>
        
        {/* Additional texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      {/* Animated fabric particles */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full blur-sm"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-6 h-6 bg-slate-400/20 rounded-full blur-sm"
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-3 h-3 bg-blue-300/40 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-600/50 mb-8 shadow-xl"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-slate-200">
{t('hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white drop-shadow-2xl">{t('hero.title.line1')}</span>
            <span className="bg-gradient-to-r from-blue-400 via-slate-300 to-black bg-clip-text text-transparent drop-shadow-2xl">
              {t('hero.title.line2')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
{t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <InteractiveHoverButton
              text={t('hero.cta.primary')}
              onClick={handleCTAClick}
              className="!w-auto !min-w-[200px] !px-8 !py-4 !text-lg shadow-2xl border-slate-600/50"
            />
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
              className="px-8 py-4 text-lg font-semibold border-2 border-slate-400/50 text-slate-200 hover:bg-slate-800/60 hover:text-white backdrop-blur-sm shadow-xl"
            >
{t('hero.cta.secondary')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "25+", label: t('hero.stats.experience') },
              { number: "1000+", label: t('hero.stats.customers') },
              { number: "50+", label: t('hero.stats.countries') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.6 }}
                className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-600/30 shadow-xl"
              >
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-slate-300 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}