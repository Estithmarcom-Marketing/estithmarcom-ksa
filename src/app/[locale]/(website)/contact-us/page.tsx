import { getSettings } from "@/lib/apis/settings";
import ContactUsClient from "./_components/contact-us-client";
import { getCountries } from "@/lib/apis/country";
import { getTranslator, Locale, TranslationKey } from "@/lib/i18n";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslator(locale);
  const title = siteTitle(t("contactus.meta.title" as TranslationKey), locale);

  return {
    title,
    description: t("contactus.meta.description" as TranslationKey),
    keywords: t("contactus.meta.keywords" as TranslationKey),
    openGraph: {
      title,
      description: t("contactus.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("contactus.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
  };
}

export default async function ContactUsPage(){
  const [settings, countries] = await Promise.all([
    getSettings(),
    getCountries()
  ]);
  return(
    <div>
      <ContactUsClient settings={settings} countries={countries} />
    </div>
  )
}
