"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocale } from "@/hooks/use-locale";
import { MoveLeft, MoveRight } from "lucide-react";
import { getTranslator } from "@/lib/i18n";
import { CountryType } from "@/lib/types/country";
import Link from "next/link";

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
            <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
              <div
                className={`absolute inset-0 bg-cover bg-center ${locale === "en" ? "scale-x-[-1]" : ""}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className="relative z-10 container mt-30! md:mt-90! px-6 h-full">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 sm:mb-8">
                  {slide.title}
                </h1>
                <p className="text-white sm:text-2xl max-w-lg leading-8 sm:leading-10 mb-4 sm:mb-10">
                  {slide.description}
                </p>
                <Link href={`/services?country_id=${slide.id}`} className="w-fit bg-secondary text-white hover:bg-primary duration-300 h-[43px] items-center flex rounded-sm px-5 gap-5">
                  <span>{t("banner.cta")}</span>
                  <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
