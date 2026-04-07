import BannerSection from "./_components/banner-section";
import BannerSwiper from "./_components/banner-swiper";
import BookSection from "./_components/book-section";
import ServicesSection from "./_components/services";
import StatsSection from "./_components/stats-section";

export default async function HomePage() {
  return (
    <div className="min-h-[8000px]">
      <section>
        <BannerSwiper />
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
      <section className="py-[100px]">
        <BannerSection />
      </section>
    </div>
  );
}
