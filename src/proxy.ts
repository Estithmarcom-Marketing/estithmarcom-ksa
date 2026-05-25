import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["ar", "en"];
const DEFAULT_LOCALE = "ar";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const currentLocale = pathname.split("/")[1];
    const pathWithoutLocale = pathname.slice(`/${currentLocale}`.length);

    if (pathWithoutLocale === "/free-zones") {
      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}`;
      return NextResponse.redirect(url);
    }
    response.headers.set("x-locale", currentLocale);
    response.headers.set("x-pathname", pathname);
    return response;
  }

  const locale =
    SUPPORTED_LOCALES.find(
      (l) => l === request.cookies.get("mithaq_lang")?.value,
    ) ?? DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.headers.set("x-locale", locale);
  response.headers.set("x-pathname", url.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
