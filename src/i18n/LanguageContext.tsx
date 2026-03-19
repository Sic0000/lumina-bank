import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageLabels: Record<Language, string> = {
  fr: 'FR',
  en: 'EN',
  pt: 'PT',
  de: 'DE',
};

export const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] || translations['fr']?.[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export { languageLabels };
