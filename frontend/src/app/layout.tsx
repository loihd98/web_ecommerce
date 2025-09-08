import type { Metadata } from "next";
import "./globals.css";
import "../styles/lego-theme.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto+Mono:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
