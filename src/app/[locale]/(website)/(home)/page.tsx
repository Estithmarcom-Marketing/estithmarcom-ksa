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
import { getCountries } from "@/lib/apis/country";
import { getHighlights } from "@/lib/apis/stats";
import { getBlogsHome } from "@/lib/apis/blog";

export default async function HomePage() {

  const [countries, services, partners, faq, highlights, zones, blogs] = await Promise.all([
    getCountries(),
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
      <section className="-mt-20 relative z-20">
        <BannerSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
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
