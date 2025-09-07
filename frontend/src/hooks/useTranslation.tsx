"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Translations {
  [key: string]: string | Translations;
}

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, fallback?: string) => string;
  translations: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const SUPPORTED_LOCALES = ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"];
const DEFAULT_LOCALE = "en";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<Translations>({});

  // Load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(
          `Failed to load translations for locale: ${locale}`,
          error
        );
        // Fallback to English if loading fails
        if (locale !== DEFAULT_LOCALE) {
          try {
            const fallbackResponse = await fetch(
              `/locales/${DEFAULT_LOCALE}/common.json`
            );
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
          } catch (fallbackError) {
            console.error(
              "Failed to load fallback translations",
              fallbackError
            );
          }
        }
      }
    };

    loadTranslations();
  }, [locale]);

  // Initialize locale from localStorage or browser preference
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      if (SUPPORTED_LOCALES.includes(browserLang)) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  const setLocale = (newLocale: string) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let value: string | Translations = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }

    return typeof value === "string" ? value : fallback || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
