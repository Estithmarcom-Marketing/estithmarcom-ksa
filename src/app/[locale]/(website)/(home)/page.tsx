import BannerSection from "./_components/banner-section";
import BannerSwiper from "./_components/banner-swiper";
import BlogSection from "./_components/blog-section";
import BookSection from "./_components/book-section";
import PartnersSection from "./_components/partners-section";
import ServicesSection from "./_components/services";
import StatsSection from "./_components/stats-section";
import VideosSection from "./_components/videos-section";

export default async function HomePage() {
  return (
    <div className="min-h-[8000px]">
      <section>
        <BannerSwiper />
      </section>
      <section className="-mt-20 relative z-20">
        <BannerSection />
      </section>
      <section className="py-[100px]">
        <ServicesSection />
      </section>
      <section>
        <BookSection />
      </section>
      <section className="py-[100px]">
        <StatsSection />
      </section>
      <section className="bg-[#f6f7f6]">
        <VideosSection />
      </section>
      <section className="py-[100px]">
        <PartnersSection />
      </section>
      <section className="bg-[#f6f7f6]">
        <BlogSection />
      </section>
    </div>
  );
}
