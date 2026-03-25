import "@/app/globals.css";
import React from "react";
// import { bukra } from "@/fonts/bukra";
import NextTopLoader from "nextjs-toploader";
import ClientProviders from "@/components/providers/client-providers";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body 
      // className={bukra.variable}
      suppressHydrationWarning>
        <NextTopLoader color="#c19a6b" showSpinner={false} />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
