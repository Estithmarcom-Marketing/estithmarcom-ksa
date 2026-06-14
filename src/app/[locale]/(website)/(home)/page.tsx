import BannerSection from "./_components/banner-section";
import BannerSwiper from "./_components/banner-swiper";
import BlogSection from "./_components/blog-section";
import BookSection from "./_components/book-section";
import FAQ from "../../../../components/global/faq";
import PartnersSection from "./_components/partners-section";
import ServicesSection from "./_components/services-section";
import StatsSection from "./_components/stats-section";
import VideosSection from "./_components/videos-section";
import ZonesSection from "./_components/zones-section";
import { getPartners } from "@/lib/apis/partner";
import { getFAQS } from "@/lib/apis/faq";
import { getZones } from "@/lib/apis/zones";
import { getServicesHome } from "@/lib/apis/service";
import { getCountriesSlide } from "@/lib/apis/country";
import { getHighlights } from "@/lib/apis/stats";
import { getBlogsHome } from "@/lib/apis/blog";
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
  const title = siteTitle(t("home.meta.title" as TranslationKey), locale);

  return {
    title,
    description: t("home.meta.description" as TranslationKey),
    keywords: t("home.meta.keywords" as TranslationKey),
    openGraph: {
      title,
      description: t("home.meta.description" as TranslationKey),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("home.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage() {

  const [countries, services, partners, faq, highlights, zones, blogs] = await Promise.all([
    getCountriesSlide(),
    getServicesHome(),
    getPartners(),
    getFAQS(),
    getHighlights(),
    getZones(),
    getBlogsHome()
  ]);

  return (
    <div>
      <section>
        <BannerSwiper countries={countries} />
      </section>
      <section className="-mt-60 md:-mt-30 relative z-20">
        <BannerSection />
      </section>
      <section className="py-[140px]! md:py-[70px]! sm:py-[100px]">
        <ServicesSection services={services} />
      </section>
      <section>
        <BookSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
        <StatsSection highlights={highlights}/>
      </section>
      <section className="bg-[#f6f7f6]">
        <VideosSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
        <PartnersSection partners={partners} />
      </section>
      <section className="bg-[#f6f7f6]">
        <BlogSection blogs={blogs} />
      </section>
      <section className="pt-[70px]! sm:pt-[100px]">
        <ZonesSection zones={zones} />
      </section>
      <section className="py-[70px]! sm:py-[100px]! container">
        <FAQ faqs={faq} />
      </section>
    </div>
  );
}
