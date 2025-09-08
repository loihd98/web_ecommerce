import { usePathname } from "next/navigation";

/**
 * Hook to create localized navigation paths
 */
export function useLocalizedNavigation() {
  const pathname = usePathname();

  // Extract current locale from pathname
  const getCurrentLocale = (): string => {
    const segments = pathname.split("/");
    // Assuming the first segment after '/' is the locale
    const locale = segments[1];
    const supportedLocales = ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"];
    return supportedLocales.includes(locale) ? locale : "vi";
  };

  // Create localized path
  const createLocalizedPath = (path: string): string => {
    const currentLocale = getCurrentLocale();
    // Remove leading slash if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `/${currentLocale}/${cleanPath}`;
  };

  return {
    createLocalizedPath,
    getCurrentLocale,
  };
}
