import BannerSwiper from "./_components/banner-swiper";
import banner_image from "@/assets/hero-banner.jpg";

export default async function HomePage() {
  return (
    <div>
      <section>
        <BannerSwiper />
      </section>
    </div>
  );
}
