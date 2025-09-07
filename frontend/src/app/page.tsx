"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get preferred language from localStorage or browser
    const savedLocale = localStorage.getItem('locale');
    const browserLang = navigator.language.slice(0, 2);
    const supportedLocales = ['en', 'vi', 'es', 'fr', 'de', 'ja', 'ko', 'zh'];
    
    let locale = 'en'; // default
    
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      locale = savedLocale;
    } else if (supportedLocales.includes(browserLang)) {
      locale = browserLang;
    }
    
    // Redirect to the language-prefixed route
    router.replace(`/${locale}`);
  }, [router]);

  // Show loading or nothing while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  );
}
