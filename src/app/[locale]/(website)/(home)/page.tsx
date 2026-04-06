import BannerSwiper from "./_components/banner-swiper";
import ServicesSection from "./_components/services";

export default async function HomePage() {
  return (
    <div>
      <section>
        <BannerSwiper />
      </section>
      <section className="py-[100px]">
        <ServicesSection />
      </section>
    </div>
  );
}
