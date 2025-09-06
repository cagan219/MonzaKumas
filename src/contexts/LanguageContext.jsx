import React, { createContext, useContext, useState } from 'react'

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
    'nav.menu': 'Menü',
    
    // Home Page
    'home.hero.title': 'Premium Kumaş ve Tekstil Koleksiyonu',
    'home.hero.subtitle': 'Yüksek kaliteli kumaşları keşfedin ve işletmenizin ihtiyaçlarına göre özelleştirilmiş çözümler alın',
    'home.hero.cta': 'Koleksiyonu Keşfet',
    'home.featured.title': 'Öne Çıkan Kumaşlar',
    'home.featured.subtitle': 'Üstün işçilik ve tasarım için özenle seçilmiş premium kalite kumaş koleksiyonumuzu keşfedin.',
    
    // Hero Stats
    'hero.stats.experience': 'Yıl Deneyim',
    'hero.stats.customers': 'Mutlu Müşteri',
    'hero.stats.countries': 'Ülkeye Hizmet',

    // Products
    'products.name.premium-wool-blend': 'Premium Yün Karışımı',
    'products.name.contemporary-cotton': 'Çağdaş Pamuk',
    'products.name.luxury-silk-collection': 'Lüks İpek Koleksiyonu',
    'products.name.technical-performance-fabric': 'Teknik Performans Kumaş',

    // Patterns
    'pattern.solid': 'Düz',
    'pattern.textured': 'Dokulu',
    'pattern.classic': 'Klasik',
    'pattern.contemporary': 'Çağdaş',

    // Colors
    'color.navy': 'Lacivert',
    'color.charcoal': 'Antrasit',
    'color.black': 'Siyah',
    'color.white': 'Beyaz',
    'color.cream': 'Krem',
    'color.light-gray': 'Açık Gri',
    'color.burgundy': 'Bordo',
    'color.gold': 'Altın',
    'color.emerald': 'Zümrüt',
    'color.gray': 'Gri',
    'color.orange': 'Turuncu',
    'color.blue': 'Mavi',
    'color.pink': 'Pembe',
    'color.beige': 'Bej',

    // Materials
    'material.wool-blend': 'Yün Karışımı',
    'material.cotton': 'Pamuk',
    'material.silk': 'İpek',
    'material.synthetic-blend': 'Sentetik Karışım',

    // Product Card
    'product.quickAdd': 'Hızlı Ekle',
    'product.outOfStock': 'Stokta Yok',
    'product.inStock': 'Stokta',
    'product.perMeter': '/metre',
    'product.available': 'mevcut',
    'product.pattern': 'Desen',
    'product.colors': 'Renkler',
    'product.material': 'Malzeme',

    // Pages
    'pages.catalog.title': 'Kumaş Kataloğu',
    'pages.catalog.subtitle': 'Premium kumaş ve tekstil koleksiyonumuzun tamamına göz atın.',
    'pages.about.title': 'Monza Tekstil Hakkında',
    'pages.about.subtitle': '1995\'ten beri premium kumaş ve tekstil çözümlerinde lider.',
    'pages.contact.title': 'Bizimle İletişime Geçin',
    'pages.contact.subtitle': 'Kumaşlarımız hakkında sorularınız var mı veya özel bir çözüme mi ihtiyacınız var? Size yardımcı olmak için buradayız.',

    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Bir hata oluştu',
    'common.retry': 'Tekrar dene',
    'common.close': 'Kapat',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.submit': 'Gönder',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.sort': 'Sırala',
    'common.clear': 'Temizle',
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
    'nav.menu': 'Menu',
    
    // Home Page
    'home.hero.title': 'Premium Fabric & Textile Collection',
    'home.hero.subtitle': 'Discover high-quality fabrics and get customized solutions tailored to your business needs',
    'home.hero.cta': 'Explore Collection',
    'home.featured.title': 'Featured Fabrics',
    'home.featured.subtitle': 'Discover our premium collection of high-quality fabrics, carefully selected for their superior craftsmanship and design.',
    
    // Hero Stats
    'hero.stats.experience': 'Years of Experience',
    'hero.stats.customers': 'Happy Customers',
    'hero.stats.countries': 'Countries Served',

    // Products
    'products.name.premium-wool-blend': 'Premium Wool Blend',
    'products.name.contemporary-cotton': 'Contemporary Cotton',
    'products.name.luxury-silk-collection': 'Luxury Silk Collection',
    'products.name.technical-performance-fabric': 'Technical Performance Fabric',

    // Patterns
    'pattern.solid': 'Solid',
    'pattern.textured': 'Textured',
    'pattern.classic': 'Classic',
    'pattern.contemporary': 'Contemporary',

    // Colors
    'color.navy': 'Navy',
    'color.charcoal': 'Charcoal',
    'color.black': 'Black',
    'color.white': 'White',
    'color.cream': 'Cream',
    'color.light-gray': 'Light Gray',
    'color.burgundy': 'Burgundy',
    'color.gold': 'Gold',
    'color.emerald': 'Emerald',
    'color.gray': 'Gray',
    'color.orange': 'Orange',
    'color.blue': 'Blue',
    'color.pink': 'Pink',
    'color.beige': 'Beige',

    // Materials
    'material.wool-blend': 'Wool Blend',
    'material.cotton': 'Cotton',
    'material.silk': 'Silk',
    'material.synthetic-blend': 'Synthetic Blend',

    // Product Card
    'product.quickAdd': 'Quick Add',
    'product.outOfStock': 'Out of Stock',
    'product.inStock': 'In Stock',
    'product.perMeter': '/meter',
    'product.available': 'available',
    'product.pattern': 'Pattern',
    'product.colors': 'Colors',
    'product.material': 'Material',

    // Pages
    'pages.catalog.title': 'Fabric Catalog',
    'pages.catalog.subtitle': 'Browse our complete collection of premium fabrics and textiles.',
    'pages.about.title': 'About Monza Tekstil',
    'pages.about.subtitle': 'Leading in premium fabric and textile solutions since 1995.',
    'pages.contact.title': 'Contact Us',
    'pages.contact.subtitle': 'Have questions about our fabrics or need a custom solution? We\'re here to help.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
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
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })
    return translation
  }

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      setLanguage: changeLanguage, // Backward compatibility
      t
    }}>
      {children}
    </LanguageContext.Provider>
  )
}