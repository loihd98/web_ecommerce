import type { Metadata } from "next";
import "../globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Providers } from "@/components/providers/Providers";
import { I18nProvider } from "@/hooks/useTranslation";

// Disable static generation for all pages in this layout
export const dynamic = "force-dynamic";

// Static generation for all supported locales
export async function generateStaticParams() {
  const locales = ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"];

  return locales.map((locale) => ({
    lang: locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const titles = {
    en: "Vuaxemohinh",
    vi: "Vua xe mô hình",
    es: "Rey modelo de auto",
    fr: "Roi du modèle de voiture",
    de: "Auto-Modell-König",
    ja: "車のモデル王",
    ko: "자동차 모델 왕",
    zh: "汽车模型王",
  };

  const descriptions = {
    en: "Leading model car platform in Vietnam",
    vi: "Vua xe mô hình hàng đầu Việt Nam",
    es: "Plataforma líder de modelos de autos en Vietnam",
    fr: "Plateforme leader de modèles de voitures au Vietnam",
    de: "Führende Auto-Modell-Plattform in Vietnam",
    ja: "ベトナムの主要なECプラットフォーム",
    ko: "베트남 최고의 전자상거래 플랫폼",
    zh: "越南领先的电商平台",
  };

  const { lang } = await params;

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description:
      descriptions[lang as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className="antialiased font-sans" suppressHydrationWarning={true}>
        <I18nProvider initialLocale={lang}>
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
