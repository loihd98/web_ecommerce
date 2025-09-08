import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales
const locales = ["en", "vi", "es", "fr", "de", "ja", "ko", "zh"];
const defaultLocale = "vi";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If pathname has locale, continue normally
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const locale = defaultLocale;

  // Handle root path
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Handle other paths
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and file extensions
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|locales|.*\\..*$).*)",
  ],
};
