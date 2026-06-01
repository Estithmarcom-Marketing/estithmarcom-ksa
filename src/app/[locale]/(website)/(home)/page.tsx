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

export default async function HomePage() {

  const [partners] = await Promise.all([
    getPartners()
  ]);

  return (
    <div>
      <section>
        <BannerSwiper />
      </section>
      <section className="-mt-20 relative z-20">
        <BannerSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
        <ServicesSection />
      </section>
      <section>
        <BookSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
        <StatsSection />
      </section>
      <section className="bg-[#f6f7f6]">
        <VideosSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]">
        <PartnersSection partners={partners} />
      </section>
      <section className="bg-[#f6f7f6]">
        <BlogSection />
      </section>
      <section className="pt-[70px]! sm:pt-[100px]">
        <ZonesSection />
      </section>
      <section className="py-[70px]! sm:py-[100px]! container">
        <FAQ />
      </section>
    </div>
  );
}
