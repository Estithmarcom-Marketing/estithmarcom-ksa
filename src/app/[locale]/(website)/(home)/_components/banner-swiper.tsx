"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import banner_image from "@/assets/hero-banner.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { MoveLeft, MoveRight } from "lucide-react";
// import "swiper/css/effect-fade";

interface BannerSlide {
  title: string;
  body: string;
  image: string;
}

const slides: BannerSlide[] = [
  {
    title: "لماذا السعودية ؟",
    body: "رؤية 2030 تفتح أبواباً غير مسبوقة للابتكار انضم إلى أكبر منظومة اقتصادية في المنطقة",
    image: banner_image.src,
  },
  {
    title: "لماذا الاردن ؟",
    body: "رؤية 2030 تفتح أبواباً غير مسبوقة للابتكار انضم إلى أكبر منظومة اقتصادية في المنطقة",
    image: banner_image.src,
  },
  {
    title: "لماذا مصر ؟",
    body: "رؤية 2030 تفتح أبواباً غير مسبوقة للابتكار انضم إلى أكبر منظومة اقتصادية في المنطقة",
    image: banner_image.src,
  },
];

export default function BannerSwiper() {
  const locale = useLocale();
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        loop={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[calc(100vh-140px)] bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 flex flex-col container justify-center px-6">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-8">
                  {slide.title}
                </h1>
                <p className="text-white sm:text-2xl max-w-lg leading-10 mb-10">
                  {slide.body}
                </p>
                <Button className="w-fit px-5 gap-5">
                  <span>ابدأ رحلتك الأن</span>
                  <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
