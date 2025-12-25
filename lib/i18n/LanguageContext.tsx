"use client";

import React, { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";
import enTranslations from "./locales/en.json";
import loTranslations from "./locales/lo.json";

export type Language = "en" | "lo";

type TranslationKeys = keyof typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const translations: Record<Language, typeof enTranslations> = {
  en: enTranslations,
  lo: loTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Helper to get initial language from localStorage
function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("language");
  if (stored === "en" || stored === "lo") return stored;
  return "en";
}

// Subscribe/snapshot for useSyncExternalStore
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Use lazy initializer to avoid setState in useEffect
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return getStoredLanguage();
  });
  
  // Using useSyncExternalStore to detect hydration
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Also set cookie for server-side access
    document.cookie = `language=${lang};path=/;max-age=31536000`; // 1 year
  }, []);

  // Prevent hydration mismatch by using server language until mounted
  const effectiveLanguage = mounted ? language : "en";

  const t = useCallback(
    (key: TranslationKeys): string => {
      return translations[effectiveLanguage][key] || key;
    },
    [effectiveLanguage]
  );

  return (
    <LanguageContext.Provider value={{ language: effectiveLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
