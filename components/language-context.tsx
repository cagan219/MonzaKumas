'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, TranslationKey, t } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    // Load language from localStorage
    const stored = localStorage.getItem('language') as Language;
    if (stored && ['tr', 'en'].includes(stored)) {
      setLanguage(stored);
    }
  }, []);

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    return t(key, language, params);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: updateLanguage,
      t: translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}