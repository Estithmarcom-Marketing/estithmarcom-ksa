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
import { getTranslator } from "@/lib/i18n";

interface BannerSlide {
  title: string;
  body: string;
  image: string;
}

export default function BannerSwiper() {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const slides: BannerSlide[] = [
    {
      title: t("banner.slide1.title"),
      body: t("banner.slide1.body"),
      image: banner_image.src,
    },
    {
      title: t("banner.slide2.title"),
      body: t("banner.slide2.body"),
      image: banner_image.src,
    },
    {
      title: t("banner.slide3.title"),
      body: t("banner.slide3.body"),
      image: banner_image.src,
    },
  ];

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
            <div className="relative w-full h-[calc(100vh-140px)] overflow-hidden">
              {/* 🔁 Flipped background only */}
              <div
                className={`absolute inset-0 bg-cover bg-center ${locale === "en" ? "scale-x-[-1]" : ""}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* ✅ Normal content (not flipped) */}
              <div className="relative z-10 flex flex-col container justify-center px-6 h-full">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-8">
                  {slide.title}
                </h1>
                <p className="text-white sm:text-2xl max-w-lg leading-10 mb-10">
                  {slide.body}
                </p>
                <Button className="w-fit px-5 gap-5">
                  <span>{t("banner.cta")}</span>
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
