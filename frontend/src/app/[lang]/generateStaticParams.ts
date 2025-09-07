// Static generation for all supported locales
export async function generateStaticParams() {
  const locales = ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"];

  return locales.map((locale) => ({
    lang: locale,
  }));
}
