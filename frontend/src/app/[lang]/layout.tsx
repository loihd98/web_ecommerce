import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const titles = {
    en: "E-Commerce Store",
    vi: "Cửa hàng thương mại điện tử",
    es: "Tienda de comercio electrónico",
    fr: "Boutique de commerce électronique",
    de: "E-Commerce-Shop",
    ja: "ECショップ",
    ko: "전자상거래 상점",
    zh: "电商商店",
  };

  const descriptions = {
    en: "Leading e-commerce platform in Vietnam",
    vi: "Cửa hàng thương mại điện tử hàng đầu Việt Nam",
    es: "Plataforma de comercio electrónico líder en Vietnam",
    fr: "Plateforme de commerce électronique leader au Vietnam",
    de: "Führende E-Commerce-Plattform in Vietnam",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider initialLocale={lang}>
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
