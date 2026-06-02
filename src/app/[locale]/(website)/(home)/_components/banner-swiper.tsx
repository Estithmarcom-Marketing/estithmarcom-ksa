"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { MoveLeft, MoveRight } from "lucide-react";
import { getTranslator } from "@/lib/i18n";
import { CountryType } from "@/lib/types/country";

export default function BannerSwiper({countries}: {countries: CountryType[]}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const slides = countries.filter((c) => (c.image))

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
              <div
                className={`absolute inset-0 bg-cover bg-center ${locale === "en" ? "scale-x-[-1]" : ""}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className="relative z-10 flex flex-col container justify-center px-6 h-full">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-8">
                  {slide.title}
                </h1>
                <p className="text-white sm:text-2xl max-w-lg leading-10 mb-10">
                  {slide.description}
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
