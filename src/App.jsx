import React, { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveHoverButton } from './components/ui/interactive-button'
// import { Flag } from 'react-flag-kit'

// Temporary flag component as fallback
const Flag = ({ country, size, className }) => (
  <div className={`bg-gray-300 ${className}`} style={{ width: size, height: size * 0.75 }}>
    {country === 'TR' ? '🇹🇷' : '🇬🇧'}
  </div>
)

// Language Context
const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translations
const translations = {
  tr: {
    // Header
    'header.search': 'Ara',
    'header.cart': 'Sepet',
    'header.menu': 'Menü',
    
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.allProducts': 'Tüm Ürünler',
    'nav.catalog': 'Katalog',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    
    // Home Page
    'home.hero.title': 'Premium Kumaş ve Tekstil Koleksiyonu',
    'home.hero.subtitle': 'Yüksek kaliteli kumaşları keşfedin ve işletmenizin ihtiyaçlarına göre özelleştirilmiş çözümler alın',
    'home.hero.cta': 'Koleksiyonu Keşfet',
    'home.collection.title': 'Yeni Koleksiyon',
    'home.collection.subtitle': 'En son kumaş trendlerini ve yeniliklerini keşfedin',
    'home.fabrics.title': 'Premium Kumaşlar',
    'home.fabrics.subtitle': 'Özenle seçilmiş kumaş koleksiyonumuzu inceleyin',
    'home.seeAll': 'Tümünü Gör',
    'home.pattern': 'Desen',
    'home.colors': 'Renkler',
    'home.stock': 'Stok',
    'home.swatchType': 'Kumaş Tipi',
    'home.inStock': 'Stokta',
    'home.outOfStock': 'Stokta Yok',
    'home.meters': 'metre',
    
    // Product Modal
    'modal.getQuote': 'Fiyat Teklifi Al',
    'modal.contactUs': 'İletişime Geçin',
    'modal.freesamples': 'Ücretsiz numuneler mevcut • Özel uzunluklar mevcut • Profesyonel danışmanlık',
    'modal.pricePerMeter': 'Metre başına fiyat',
    'modal.description.solid': 'Bu premium kumaş, zarif tasarımı ve üstün kalitesiyle öne çıkıyor. Modern işlemler kullanılarak üretilen bu kumaş, hem konfor hem de şıklık arayanlar için mükemmel bir seçim.',
    'modal.description.contemporary': 'Çağdaş tasarımlar için özel olarak geliştirilmiş bu kumaş serisi, modern yaşam tarzına uygun özellikleriyle dikkat çekiyor. Yüksek kaliteli lifler ve yenilikçi dokuma tekniklerinin bir araya gelmesiyle oluşmuştur.',
    'modal.description.textured': 'Dokulu yüzeyi ve benzersiz hissi ile bu premium kumaş, özel projeleriniz için ideal bir seçimdir. El işçiliği detayları ve kaliteli malzemeler kullanılarak üretilmiştir.',
    'modal.description.classic': 'Klasik zarafeti modern kaliteyle buluşturan bu kumaş serisi, zamansız tasarımlar için mükemmeldir. Uzun yıllar boyunca güzelliğini koruyacak şekilde özenle üretilmiştir.',
    
    // Products Page
    'products.title': 'Tüm Ürünler',
    'products.subtitle': 'Premium kumaş koleksiyonumuzu keşfedin',
    'products.search': 'Ürün ara...',
    'products.allPatterns': 'Tüm Desenler',
    'products.allColors': 'Tüm Renkler',
    'products.inStockOnly': 'Sadece Stokta Olanlar',
    'products.sortBy': 'Sırala',
    'products.newest': 'En Yeni',
    'products.priceHigh': 'Fiyat (Yüksek-Düşük)',
    'products.priceLow': 'Fiyat (Düşük-Yüksek)',
    'products.name': 'İsim',
    'products.noResults': 'Ürün bulunamadı',
    'products.noResultsDesc': 'Arama veya filtre kriterlerinizi ayarlamayı deneyin.',
    'products.clearFilters': 'Tüm Filtreleri Temizle',
    'products.showing': '{count} ürün gösteriliyor',
    
    // Catalog Page
    'catalog.title': 'Kumaş Kataloğu',
    'catalog.subtitle': 'Tüm premium kumaş ve tekstil koleksiyonumuzu keşfedin. Gerçek kumaş numuneleri ile tam koleksiyonumuzu incelemek için fiziksel katalog talep edin.',
    'catalog.physicalTitle': 'Fiziksel Katalog',
    'catalog.physicalDesc': 'Kapsamlı fiziksel kataloğumuz gerçek kumaş numuneleri, detaylı özellikler, fiyat bilgileri ve uygulama kılavuzları içerir. Kumaş kalitesini hissetmek ve incelemek isteyen tasarımcılar, üreticiler ve işletmeler için mükemmeldir.',
    'catalog.features.samples': '200+ kumaş numunesi',
    'catalog.features.specs': 'Detaylı özellikler ve bakım talimatları',
    'catalog.features.pricing': 'Profesyonel fiyatlandırma ve minimum sipariş miktarları',
    'catalog.features.shipping': 'Dünya geneline ücretsiz kargo',
    'catalog.sectionsTitle': 'Katalog Bölümleri',
    'catalog.premiumWool': 'Premium Yün',
    'catalog.premiumWoolDesc': 'Lüks giysiler için yüksek kaliteli yün kumaşlar',
    'catalog.cottonBlends': 'Pamuk Karışımları',
    'catalog.cottonBlendsDesc': 'Rahat ve çok yönlü pamuk kumaş karışımları',
    'catalog.silkCollection': 'İpek Koleksiyonu',
    'catalog.silkCollectionDesc': 'Özel durumlar için zarif ipek kumaşlar',
    'catalog.technicalFabrics': 'Teknik Kumaşlar',
    'catalog.technicalFabricsDesc': 'Endüstriyel uygulamalar için performans kumaşları',
    'catalog.seasonal': 'Sezonluk Koleksiyon',
    'catalog.seasonalDesc': 'Sınırlı sayıda sezonluk kumaş tasarımları',
    'catalog.custom': 'Özel Çözümler',
    'catalog.customDesc': 'Özel kumaş geliştirme ve özelleştirme',
    'catalog.requestTitle': 'Fiziksel Katalog Talep Et',
    'catalog.requestDesc': 'Kumaş numuneleri ile birlikte eksiksiz fiziksel kataloğumuzu almak için aşağıdaki formu doldurun. Teslimat genellikle 5-7 iş günü sürer.',
    'catalog.form.fullName': 'Ad Soyad',
    'catalog.form.company': 'Şirket',
    'catalog.form.email': 'E-posta',
    'catalog.form.phone': 'Telefon',
    'catalog.form.address': 'Adres',
    'catalog.form.city': 'Şehir',
    'catalog.form.country': 'Ülke',
    'catalog.form.interests': 'İlgi Alanları (İstediğinizi seçin)',
    'catalog.form.notes': 'Ek Notlar',
    'catalog.form.notesPlaceholder': 'Katalog hakkında özel gereksinimleriniz veya sorularınız...',
    'catalog.form.submit': 'Katalog Talep Et',
    'catalog.form.submitting': 'Talep Gönderiliyor...',
    'catalog.form.success': 'Katalog talebiniz başarıyla gönderildi! Fiziksel kataloğunuzu 5-7 iş günü içinde göndereceğiz.',
    'catalog.form.required': 'Lütfen tüm gerekli alanları doldurun.',
    'catalog.form.footer': '* Dünya geneline ücretsiz kargo • 5-7 iş günü teslimat • Taahhüt gerekmez',
    
    // Contact Page
    'contact.title': 'İletişim',
    'contact.getInTouch': 'İletişime Geçin',
    'contact.description': 'Tüm tekstil ihtiyaçlarınız için bizimle iletişime geçin. 24 saat içinde yanıtlıyoruz.',
    'contact.phone': 'Telefon',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'E-posta',
    'contact.address': 'Adres',
    'contact.businessHours': 'Çalışma Saatleri',
    'contact.monday': 'Pazartesi - Cuma:',
    'contact.saturday': 'Cumartesi:',
    'contact.sunday': 'Pazar:',
    'contact.closed': 'Kapalı',
    'contact.response': '✓ 24 saat içinde yanıtlıyoruz',
    'contact.formTitle': 'Bize Mesaj Gönderin',
    'contact.form.fullName': 'Ad Soyad',
    'contact.form.email': 'E-posta',
    'contact.form.phone': 'Telefon',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesaj',
    'contact.form.contactRequired': '* En az bir iletişim yöntemi (e-posta veya telefon) gereklidir',
    'contact.form.send': 'Mesaj Gönder',
    'contact.form.sending': 'Gönderiliyor...',
    'contact.form.success': 'Mesaj başarıyla gönderildi! 24 saat içinde yanıtlayacağız.',
    'contact.form.error': 'Lütfen tüm gerekli alanları doldurun.',
    'contact.form.subjects.productInquiry': 'Ürün Sorusu',
    'contact.form.subjects.customOrder': 'Özel Sipariş',
    'contact.form.subjects.bulkOrder': 'Toplu Sipariş',
    'contact.form.subjects.pricing': 'Fiyat Bilgisi',
    'contact.form.subjects.technical': 'Teknik Destek',
    'contact.form.subjects.partnership': 'Ortaklık',
    'contact.form.subjects.other': 'Diğer',
    
    // About Page
    'about.title': 'Hakkımızda',
    'about.subtitle': 'Premium kumaş ve tekstil çözümlerinde lider',
    'about.description1': '1995 yılında kurulan Monza Tekstil, kalite ve yeniliği tekstil sektöründe bir araya getiren öncü şirketlerden biridir.',
    'about.description2': 'Yılların deneyimi ve modern teknolojinin gücüyle, müşterilerimize en iyi hizmeti sunmayı hedefliyoruz.',
    'about.experience': '25+ Yıl',
    'about.experienceDesc': 'Tekstil deneyimi',
    'about.customers': '1000+',
    'about.customersDesc': 'Mutlu müşteri',
    'about.countries': '50+',
    'about.countriesDesc': 'Hizmet verilen ülke',
    
    // Common
    'common.required': 'zorunlu',
    'common.optional': 'isteğe bağlı',
    'common.close': 'Kapat',
    'common.loading': 'Yükleniyor...',
    
    // Footer
    'footer.rights': '© 2025 MINNA. Tüm hakları saklıdır.',
  },
  en: {
    // Header
    'header.search': 'Search',
    'header.cart': 'Cart',
    'header.menu': 'Menu',
    
    // Navigation
    'nav.home': 'Home',
    'nav.allProducts': 'All Products',
    'nav.catalog': 'Catalog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Premium Fabric & Textile Collection',
    'home.hero.subtitle': 'Discover high-quality fabrics and get customized solutions tailored to your business needs',
    'home.hero.cta': 'Explore Collection',
    'home.collection.title': 'New Collection',
    'home.collection.subtitle': 'Discover the latest fabric trends and innovations',
    'home.fabrics.title': 'Premium Fabrics',
    'home.fabrics.subtitle': 'Browse our carefully curated fabric collection',
    'home.seeAll': 'See all',
    'home.pattern': 'Pattern',
    'home.colors': 'Colors',
    'home.stock': 'Stock',
    'home.swatchType': 'Swatch Type',
    'home.inStock': 'In Stock',
    'home.outOfStock': 'Out of Stock',
    'home.meters': 'meters',
    
    // Product Modal
    'modal.getQuote': 'Get Quote',
    'modal.contactUs': 'Contact Us',
    'modal.freesamples': 'Free samples available • Custom lengths available • Professional consultation',
    'modal.pricePerMeter': 'Price per meter',
    'modal.description.solid': 'This premium fabric stands out with its elegant design and superior quality. Produced using modern processes, this fabric is a perfect choice for those seeking both comfort and elegance.',
    'modal.description.contemporary': 'This fabric series, specially developed for contemporary designs, attracts attention with its features suitable for modern lifestyle. It is created by combining high-quality fibers and innovative weaving techniques.',
    'modal.description.textured': 'With its textured surface and unique feel, this premium fabric is an ideal choice for your special projects. It is produced using handicraft details and quality materials.',
    'modal.description.classic': 'This fabric series that combines classic elegance with modern quality is perfect for timeless designs. It is carefully produced to preserve its beauty for many years.',
    
    // Products Page
    'products.title': 'All Products',
    'products.subtitle': 'Discover our premium fabric collection',
    'products.search': 'Search products...',
    'products.allPatterns': 'All Patterns',
    'products.allColors': 'All Colors',
    'products.inStockOnly': 'In Stock Only',
    'products.sortBy': 'Sort By',
    'products.newest': 'Newest',
    'products.priceHigh': 'Price (High-Low)',
    'products.priceLow': 'Price (Low-High)',
    'products.name': 'Name',
    'products.noResults': 'No products found',
    'products.noResultsDesc': 'Try adjusting your search or filter criteria.',
    'products.clearFilters': 'Clear All Filters',
    'products.showing': 'Showing {count} products',
    
    // Catalog Page
    'catalog.title': 'Fabric Catalog',
    'catalog.subtitle': 'Discover our complete collection of premium fabrics and textiles. Request a physical catalog to explore our full range with actual fabric samples.',
    'catalog.physicalTitle': 'Physical Catalog',
    'catalog.physicalDesc': 'Our comprehensive physical catalog includes actual fabric samples, detailed specifications, pricing information, and application guides. Perfect for designers, manufacturers, and businesses who need to feel and examine fabric quality.',
    'catalog.features.samples': 'Over 200 fabric samples',
    'catalog.features.specs': 'Detailed specifications and care instructions',
    'catalog.features.pricing': 'Professional pricing and minimum order quantities',
    'catalog.features.shipping': 'Free shipping worldwide',
    'catalog.sectionsTitle': 'Catalog Sections',
    'catalog.premiumWool': 'Premium Wool',
    'catalog.premiumWoolDesc': 'High-quality wool fabrics for luxury garments',
    'catalog.cottonBlends': 'Cotton Blends',
    'catalog.cottonBlendsDesc': 'Comfortable and versatile cotton fabric blends',
    'catalog.silkCollection': 'Silk Collection',
    'catalog.silkCollectionDesc': 'Elegant silk fabrics for special occasions',
    'catalog.technicalFabrics': 'Technical Fabrics',
    'catalog.technicalFabricsDesc': 'Performance fabrics for industrial applications',
    'catalog.seasonal': 'Seasonal Collection',
    'catalog.seasonalDesc': 'Limited edition seasonal fabric designs',
    'catalog.custom': 'Custom Solutions',
    'catalog.customDesc': 'Bespoke fabric development and customization',
    'catalog.requestTitle': 'Request Physical Catalog',
    'catalog.requestDesc': 'Fill out the form below to receive our complete physical catalog with fabric samples. Delivery typically takes 5-7 business days.',
    'catalog.form.fullName': 'Full Name',
    'catalog.form.company': 'Company',
    'catalog.form.email': 'Email',
    'catalog.form.phone': 'Phone',
    'catalog.form.address': 'Address',
    'catalog.form.city': 'City',
    'catalog.form.country': 'Country',
    'catalog.form.interests': 'Areas of Interest (Select all that apply)',
    'catalog.form.notes': 'Additional Notes',
    'catalog.form.notesPlaceholder': 'Any specific requirements or questions about the catalog...',
    'catalog.form.submit': 'Request Catalog',
    'catalog.form.submitting': 'Submitting Request...',
    'catalog.form.success': 'Catalog request submitted successfully! We will send your physical catalog within 5-7 business days.',
    'catalog.form.required': 'Please fill in all required fields.',
    'catalog.form.footer': '* Free worldwide shipping • 5-7 business days delivery • No commitment required',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.description': 'Get in touch with us for all your textile needs. We respond within 24 hours.',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.monday': 'Monday - Friday:',
    'contact.saturday': 'Saturday:',
    'contact.sunday': 'Sunday:',
    'contact.closed': 'Closed',
    'contact.response': '✓ We respond within 24 hours',
    'contact.formTitle': 'Send us a Message',
    'contact.form.fullName': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.contactRequired': '* At least one contact method (email or phone) is required',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully! We will respond within 24 hours.',
    'contact.form.error': 'Please fill in all required fields.',
    'contact.form.subjects.productInquiry': 'Product Inquiry',
    'contact.form.subjects.customOrder': 'Custom Order',
    'contact.form.subjects.bulkOrder': 'Bulk Order',
    'contact.form.subjects.pricing': 'Pricing Information',
    'contact.form.subjects.technical': 'Technical Support',
    'contact.form.subjects.partnership': 'Partnership',
    'contact.form.subjects.other': 'Other',
    
    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Leading in premium fabric and textile solutions',
    'about.description1': 'Founded in 1995, Monza Tekstil is a leading provider of premium quality fabrics and textiles. We specialize in high-end materials for fashion, upholstery, and industrial applications.',
    'about.description2': 'Our commitment to quality and customer service has made us a trusted partner for designers, manufacturers, and businesses worldwide.',
    'about.experience': '25+ Years',
    'about.experienceDesc': 'Experience in textiles',
    'about.customers': '1000+',
    'about.customersDesc': 'Happy customers',
    'about.countries': '50+',
    'about.countriesDesc': 'Countries served',
    
    // Common
    'common.required': 'required',
    'common.optional': 'optional',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    
    // Footer
    'footer.rights': '© 2025 MINNA. All rights reserved.',
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key, params = {}) => {
    let translation = translations[language][key] || key
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })
    
    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Modern Header Component
function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const { language, changeLanguage, t } = useLanguage()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLanguageDropdownOpen(false)
    }
    
    if (isLanguageDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLanguageDropdownOpen])
  
  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <a href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                Monza Kumas
              </a>
            </div>
            
            {/* Search, Language Toggle & Cart Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900" title={t('header.search')}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Language Toggle */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  title="Change Language / Dil Değiştir"
                >
                  <Flag 
                    country={language === 'tr' ? 'TR' : 'GB'} 
                    size={24} 
                    className="rounded-sm"
                  />
                </button>
                
                {/* Language Dropdown */}
                <AnimatePresence>
                  {isLanguageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          changeLanguage('en')
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${language === 'en' ? 'bg-blue-50' : ''}`}
                      >
                        <Flag country="GB" size={20} className="rounded-sm" />
                        <span className="text-sm font-medium">English</span>
                      </button>
                      <button
                        onClick={() => {
                          changeLanguage('tr')
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${language === 'tr' ? 'bg-blue-50' : ''}`}
                      >
                        <Flag country="TR" size={20} className="rounded-sm" />
                        <span className="text-sm font-medium">Türkçe</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900" title={t('header.cart')}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5 0a2 2 0 100 4 2 2 0 000-4zm-6 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'spring',
                stiffness: 320,
                damping: 28
              }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-4">
                  {[
                    { name: t('nav.allProducts'), path: '/products' },
                    { name: t('nav.catalog'), path: '/catalog' },
                    { name: t('nav.about'), path: '/about' },
                    { name: t('nav.contact'), path: '/contact' }
                  ].map((item, index) => (
                    <motion.a 
                      key={item.path}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Modern Footer Component
function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Monza Kumas</h3>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

// Product Modal Component
function ProductModal({ product, isOpen, onClose }) {
  const { t } = useLanguage()
  
  if (!isOpen || !product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Product Image */}
              <div className="aspect-[4/3] bg-gray-100 rounded-t-2xl overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Product Name */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.pricePerMeter}
                  </span>
                  <span className="text-gray-600 ml-2">per meter</span>
                </div>

                {/* Product Attributes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Pattern */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Pattern</h3>
                    <p className="text-gray-700">{product.pattern}</p>
                  </div>

                  {/* Swatch Type */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Swatch Type</h3>
                    <p className="text-gray-700">{product.swatchType}</p>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Stock Level</h3>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        product.lengthMeters > 20 ? 'bg-green-500' : 
                        product.lengthMeters > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-semibold ${
                        product.lengthMeters > 20 ? 'text-green-600' : 
                        product.lengthMeters > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.lengthMeters > 0 ? `${product.lengthMeters} meters available` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.pattern === 'Solid' ? 
                      'Premium solid color fabric perfect for elegant designs. High-quality construction ensures durability and comfort.' :
                    product.pattern === 'Designer' ? 
                      'Exclusive designer pattern featuring unique artistic elements. Perfect for creating standout pieces with contemporary flair.' :
                    product.pattern === 'Handwoven' ? 
                      'Carefully handwoven fabric showcasing traditional craftsmanship. Each piece is unique with subtle variations that add character.' :
                    product.pattern === 'Tweed' ? 
                      'Classic tweed pattern with timeless appeal. Durable and warm, perfect for sophisticated garments with traditional styling.' :
                    product.pattern === 'Striped' ? 
                      'Clean striped design offering versatility in styling. Perfect for both formal and casual applications.' :
                      'High-quality fabric with premium construction. Carefully selected materials ensure excellent drape and longevity.'
                    }
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      product.lengthMeters > 0 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.lengthMeters === 0}
                  >
                    {product.lengthMeters > 0 ? 'Request Quote' : 'Out of Stock'}
                  </button>
                  <button className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    Contact Us
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Free samples available • Custom lengths available • Professional consultation</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Modern HomePage
function HomePage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300) // Wait for animation to complete
  }

  useEffect(() => {
    // Simulate loading fabrics data
    const loadFabrics = async () => {
      try {
        // Mock data matching our Product type structure
        const mockProducts = [
          {
            id: "fab-001",
            slug: "premium-wool-navy", 
            name: "A Young Woman in Colorful Jacket",
            images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop"],
            pattern: "Solid",
            colors: ["Pink", "Green", "Yellow"],
            swatchType: "Super 120s",
            lengthMeters: 50,
            pricePerMeter: 108,
            createdAt: "2024-01-01T00:00:00.000Z"
          },
          {
            id: "fab-002",
            slug: "modern-casual-jacket",
            name: "Modern Casual Jacket", 
            images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop"],
            pattern: "Contemporary",
            colors: ["Orange", "Blue"],
            swatchType: "Super 130s",
            lengthMeters: 35,
            pricePerMeter: 95,
            createdAt: "2024-01-02T00:00:00.000Z"
          },
          {
            id: "fab-003", 
            slug: "premium-fabric-collection",
            name: "Premium Fabric Collection",
            images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop"],
            pattern: "Textured",
            colors: ["Pink", "White"],
            swatchType: "Silk Mix",
            lengthMeters: 25,
            pricePerMeter: 120,
            createdAt: "2024-01-03T00:00:00.000Z"
          },
          {
            id: "fab-004",
            slug: "elegant-textile-design",
            name: "Elegant Textile Design",
            images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop"],
            pattern: "Classic",
            colors: ["Beige", "Cream"],
            swatchType: "Super 110s", 
            lengthMeters: 42,
            pricePerMeter: 85,
            createdAt: "2024-01-04T00:00:00.000Z"
          },
          {
            id: "fab-005",
            slug: "contemporary-style",
            name: "Contemporary Style",
            images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"],
            pattern: "Modern",
            colors: ["Black", "Gray"],
            swatchType: "Super 120s",
            lengthMeters: 38,
            pricePerMeter: 110,
            createdAt: "2024-01-05T00:00:00.000Z"
          },
          {
            id: "fab-006",
            slug: "luxury-fabric-series",
            name: "Luxury Fabric Series",
            images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop"],
            pattern: "Premium",
            colors: ["Blue", "White"],
            swatchType: "Super 140s",
            lengthMeters: 30,
            pricePerMeter: 135,
            createdAt: "2024-01-06T00:00:00.000Z"
          },
          {
            id: "fab-007",
            slug: "artisan-collection", 
            name: "Artisan Collection",
            images: ["https://images.unsplash.com/photo-1566479179817-0a7fbfce43da?w=400&h=500&fit=crop"],
            pattern: "Handwoven",
            colors: ["Green", "Brown"],
            swatchType: "Artisan",
            lengthMeters: 20,
            pricePerMeter: 98,
            createdAt: "2024-01-07T00:00:00.000Z"
          },
          {
            id: "fab-008",
            slug: "designer-patterns",
            name: "Designer Patterns",
            images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop"],
            pattern: "Designer",
            colors: ["Multi", "Colorful"], 
            swatchType: "Designer Mix",
            lengthMeters: 45,
            pricePerMeter: 115,
            createdAt: "2024-01-08T00:00:00.000Z"
          }
        ]
        
        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading fabrics:', error)
        setLoading(false)
      }
    }

    loadFabrics()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Background Collage */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image Collage */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-oguzhan-karaca-1920519-3544567.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-pixabay-325876.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-tima-miroshnichenko-6766360.jpg)'}}
          ></div>
          <div 
            className="bg-cover bg-center opacity-80" 
            style={{backgroundImage: 'url(/images/pexels-tima-miroshnichenko-6766365.jpg)'}}
          ></div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            >
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <InteractiveHoverButton
                text={t('home.hero.cta')}
                onClick={() => window.location.href = '/products'}
                className="!w-auto !min-w-[200px] !px-8 !py-4 !text-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Collection Mosaic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">New Collection</h2>
          <p className="text-gray-600">Discover our latest textile designs and patterns</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-96">
          {/* Large image - spans 2 columns */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop" 
              alt="New Collection Feature"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">Featured Design</h3>
              <p className="text-sm opacity-90">Modern Patterns</p>
            </div>
          </div>
          
          {/* Small images */}
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" 
              alt="Collection Item"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all"></div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Products</h2>
          <div className="text-coral-500 font-medium">8 products</div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }
            }
          }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              onClick={() => openProductModal(product)}
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                <motion.img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {product.name}
                </h3>
                
                {/* Price */}
                <p className="text-green-600 font-bold text-lg">
                  ${product.pricePerMeter}/meter
                </p>

                {/* Pattern */}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Pattern:</span>
                  <span className="ml-2">{product.pattern}</span>
                </div>

                {/* Colors */}
                <div>
                  <span className="text-sm font-medium text-gray-600">Colors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.colors.map((color, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stock Level */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Stock:</span>
                    <span className={`ml-2 font-semibold ${
                      product.lengthMeters > 20 ? 'text-green-600' : 
                      product.lengthMeters > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.lengthMeters > 0 ? `${product.lengthMeters}m` : 'Out of Stock'}
                    </span>
                  </div>
                  
                  {/* Stock Status Indicator */}
                  <div className={`w-3 h-3 rounded-full ${
                    product.lengthMeters > 20 ? 'bg-green-500' : 
                    product.lengthMeters > 0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <InteractiveHoverButton
            text={t('home.seeAll')}
            onClick={() => window.location.href = '/products'}
            className="w-20 px-1 py-1 text-base shadow-lg whitespace-nowrap mx-auto"
          />
        </div>
      </div>

      <Footer />
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
    </div>
  )
}

function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPattern, setSelectedPattern] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  useEffect(() => {
    // Load all products
    const loadProducts = async () => {
      try {
        const mockProducts = [
          {
            id: "fab-001",
            slug: "premium-wool-navy", 
            name: "A Young Woman in Colorful Jacket",
            images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop"],
            pattern: "Solid",
            colors: ["Pink", "Green", "Yellow"],
            swatchType: "Super 120s",
            lengthMeters: 50,
            pricePerMeter: 108,
            createdAt: "2024-01-01T00:00:00.000Z"
          },
          {
            id: "fab-002",
            slug: "modern-casual-jacket",
            name: "Modern Casual Jacket", 
            images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop"],
            pattern: "Contemporary",
            colors: ["Orange", "Blue"],
            swatchType: "Super 130s",
            lengthMeters: 35,
            pricePerMeter: 95,
            createdAt: "2024-01-02T00:00:00.000Z"
          },
          {
            id: "fab-003", 
            slug: "premium-fabric-collection",
            name: "Premium Fabric Collection",
            images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop"],
            pattern: "Textured",
            colors: ["Pink", "White"],
            swatchType: "Silk Mix",
            lengthMeters: 25,
            pricePerMeter: 120,
            createdAt: "2024-01-03T00:00:00.000Z"
          },
          {
            id: "fab-004",
            slug: "elegant-textile-design",
            name: "Elegant Textile Design",
            images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop"],
            pattern: "Classic",
            colors: ["Beige", "Cream"],
            swatchType: "Super 110s", 
            lengthMeters: 42,
            pricePerMeter: 85,
            createdAt: "2024-01-04T00:00:00.000Z"
          },
          {
            id: "fab-005",
            slug: "contemporary-style",
            name: "Contemporary Style",
            images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"],
            pattern: "Modern",
            colors: ["Black", "Gray"],
            swatchType: "Super 120s",
            lengthMeters: 38,
            pricePerMeter: 110,
            createdAt: "2024-01-05T00:00:00.000Z"
          },
          {
            id: "fab-006",
            slug: "luxury-fabric-series",
            name: "Luxury Fabric Series",
            images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop"],
            pattern: "Premium",
            colors: ["Blue", "White"],
            swatchType: "Super 140s",
            lengthMeters: 30,
            pricePerMeter: 135,
            createdAt: "2024-01-06T00:00:00.000Z"
          },
          {
            id: "fab-007",
            slug: "artisan-collection", 
            name: "Artisan Collection",
            images: ["https://images.unsplash.com/photo-1566479179817-0a7fbfce43da?w=400&h=500&fit=crop"],
            pattern: "Handwoven",
            colors: ["Green", "Brown"],
            swatchType: "Artisan",
            lengthMeters: 20,
            pricePerMeter: 98,
            createdAt: "2024-01-07T00:00:00.000Z"
          },
          {
            id: "fab-008",
            slug: "designer-patterns",
            name: "Designer Patterns",
            images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop"],
            pattern: "Designer",
            colors: ["Multi", "Colorful"], 
            swatchType: "Designer Mix",
            lengthMeters: 45,
            pricePerMeter: 115,
            createdAt: "2024-01-08T00:00:00.000Z"
          },
          {
            id: "fab-009",
            slug: "vintage-tweed",
            name: "Vintage Tweed Pattern",
            images: ["https://images.unsplash.com/photo-1489370321024-e0834ad8b2e2?w=400&h=500&fit=crop"],
            pattern: "Tweed",
            colors: ["Brown", "Tan"],
            swatchType: "Super 100s",
            lengthMeters: 0,
            pricePerMeter: 88,
            createdAt: "2024-01-09T00:00:00.000Z"
          },
          {
            id: "fab-010",
            slug: "silk-stripe",
            name: "Silk Stripe Collection",
            images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop"],
            pattern: "Striped",
            colors: ["Navy", "Gold"],
            swatchType: "Pure Silk",
            lengthMeters: 15,
            pricePerMeter: 145,
            createdAt: "2024-01-10T00:00:00.000Z"
          }
        ]
        
        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error loading products:', error)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.colors.some(color => color.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesPattern = !selectedPattern || product.pattern === selectedPattern
      const matchesColor = !selectedColor || product.colors.some(color => color.toLowerCase().includes(selectedColor.toLowerCase()))
      const matchesStock = !inStockOnly || product.lengthMeters > 0

      return matchesSearch && matchesPattern && matchesColor && matchesStock
    })

    // Sort products
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.pricePerMeter - b.pricePerMeter)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.pricePerMeter - a.pricePerMeter)
    } else if (sortBy === 'stock') {
      filtered.sort((a, b) => b.lengthMeters - a.lengthMeters)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedPattern, selectedColor, inStockOnly, sortBy])

  // Get unique patterns and colors for filter options
  const uniquePatterns = [...new Set(products.map(p => p.pattern))]
  const uniqueColors = [...new Set(products.flatMap(p => p.colors))]

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedPattern('')
    setSelectedColor('')
    setInStockOnly(false)
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Search and Filters Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Browse our complete collection of premium fabrics</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products, patterns, colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Pattern Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
              <select
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="">All Patterns</option>
                {uniquePatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="">All Colors</option>
                {uniqueColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div className="flex items-center py-3">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">In stock only</label>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length > 0 
                ? `Showing ${filteredProducts.length} of ${products.length} products` 
                : 'No products found'}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                }
              }
            }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <motion.img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <p className="text-green-600 font-bold text-lg">
                      ${product.pricePerMeter}/meter
                    </p>

                    {/* Pattern */}
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Pattern:</span>
                      <span className="ml-2">{product.pattern}</span>
                    </div>

                    {/* Colors */}
                    <div>
                      <span className="text-sm font-medium text-gray-600">Colors:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.colors.map((color, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stock Level */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium text-gray-600">Stock:</span>
                        <span className={`ml-2 font-semibold ${
                          product.lengthMeters > 20 ? 'text-green-600' : 
                          product.lengthMeters > 0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {product.lengthMeters > 0 ? `${product.lengthMeters}m` : 'Out of Stock'}
                        </span>
                      </div>
                      
                      {/* Stock Status Indicator */}
                      <div className={`w-3 h-3 rounded-full ${
                        product.lengthMeters > 20 ? 'bg-green-500' : 
                        product.lengthMeters > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
    </div>
  )
}

function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Monza Tekstil</h1>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">All Products</a>
              <a href="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 font-semibold">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">About Monza Tekstil</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 mb-6">
            Founded in 1995, Monza Tekstil is a leading provider of premium quality fabrics and textiles. 
            We specialize in high-end materials for fashion, upholstery, and industrial applications.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our commitment to quality and customer service has made us a trusted partner for designers, 
            manufacturers, and businesses worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">25+ Years</h3>
              <p className="text-gray-600">Experience in textiles</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">1000+</h3>
              <p className="text-gray-600">Happy customers</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">50+</h3>
              <p className="text-gray-600">Countries served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullName || (!formData.email && !formData.phone) || !formData.subject || !formData.message) {
      setSubmitStatus('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('Message sent successfully! We will respond within 24 hours.')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Monza Tekstil</h1>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">All Products</a>
              <a href="/catalog" className="text-gray-600 hover:text-gray-900">Catalog</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 font-semibold">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                Get in touch with us for all your textile needs. We respond within 24 hours.
              </p>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:+905327473215" className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                      +90 532 747 32 15
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <a href="https://wa.me/905327473215" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                      +90 532 747 32 15
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:monzakumas@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      monzakumas@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <a href="https://maps.app.goo.gl/raxiq7xe4G34wi4x6" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors">
                      Akşemsettin, Elmas Sk. No:15<br />
                      34070 Eyüpsultan/İstanbul, Türkiye
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-medium mt-4">
                  ✓ We respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.includes('successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="+90 xxx xxx xx xx"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">* At least one contact method (email or phone) is required</p>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="custom-order">Custom Order</option>
                  <option value="bulk-order">Bulk Order</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
                } text-white`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function CatalogPage() {
  const { t } = useLanguage()
  const [catalogRequest, setCatalogRequest] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    interests: [],
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e) => {
    setCatalogRequest({
      ...catalogRequest,
      [e.target.name]: e.target.value
    })
  }

  const handleInterestChange = (interest) => {
    setCatalogRequest({
      ...catalogRequest,
      interests: catalogRequest.interests.includes(interest)
        ? catalogRequest.interests.filter(i => i !== interest)
        : [...catalogRequest.interests, interest]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!catalogRequest.fullName || !catalogRequest.email || !catalogRequest.address || !catalogRequest.city || !catalogRequest.country) {
      setSubmitStatus('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('Catalog request submitted successfully! We will send your physical catalog within 5-7 business days.')
      setCatalogRequest({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        interests: [],
        notes: ''
      })
    }, 2000)
  }

  const catalogCategories = [
    { id: 'premium-wool', name: 'Premium Wool', description: 'High-quality wool fabrics for luxury garments' },
    { id: 'cotton-blends', name: 'Cotton Blends', description: 'Comfortable and versatile cotton fabric blends' },
    { id: 'silk-collection', name: 'Silk Collection', description: 'Elegant silk fabrics for special occasions' },
    { id: 'technical-fabrics', name: 'Technical Fabrics', description: 'Performance fabrics for industrial applications' },
    { id: 'seasonal', name: 'Seasonal Collection', description: 'Limited edition seasonal fabric designs' },
    { id: 'custom', name: 'Custom Solutions', description: 'Bespoke fabric development and customization' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Monza Tekstil</h1>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">All Products</a>
              <a href="/catalog" className="text-gray-600 hover:text-gray-900 font-semibold">Catalog</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fabric Catalog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete collection of premium fabrics and textiles. Request a physical catalog to explore our full range with actual fabric samples.
          </p>
        </div>

        {/* Catalog Overview */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Physical Catalog</h3>
                <p className="text-gray-600 mb-6">
                  Our comprehensive physical catalog includes actual fabric samples, detailed specifications, 
                  pricing information, and application guides. Perfect for designers, manufacturers, and businesses 
                  who need to feel and examine fabric quality.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Over 200 fabric samples
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Detailed specifications and care instructions
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Professional pricing and minimum order quantities
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free shipping worldwide
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop" 
                  alt="Physical catalog preview" 
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Catalog Categories */}
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Catalog Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {catalogCategories.map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h4>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Physical Catalog</h3>
          <p className="text-gray-600 mb-8">
            Fill out the form below to receive our complete physical catalog with fabric samples. 
            Delivery typically takes 5-7 business days.
          </p>
          
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={catalogRequest.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={catalogRequest.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Company name (optional)"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={catalogRequest.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={catalogRequest.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+90 xxx xxx xx xx"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={catalogRequest.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={catalogRequest.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="City"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={catalogRequest.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Country"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Areas of Interest (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {catalogCategories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={catalogRequest.interests.includes(category.id)}
                      onChange={() => handleInterestChange(category.id)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={catalogRequest.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Any specific requirements or questions about the catalog..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
              } text-white`}
            >
              {isSubmitting ? 'Submitting Request...' : 'Request Catalog'}
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              * Free worldwide shipping • 5-7 business days delivery • No commitment required
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App