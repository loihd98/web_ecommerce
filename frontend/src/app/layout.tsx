import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/lego-theme.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vuaxemohinh Shop - Cửa Hàng Mô Hình Xe Hơi",
  description:
    "Cửa hàng mô hình xe hơi hàng đầu Việt Nam. Khám phá bộ sưu tập xe mô hình chất lượng cao từ các thương hiệu nổi tiếng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
